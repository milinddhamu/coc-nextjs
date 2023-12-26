require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { initClashOfClansClient } = require('./helpers/cocauth');
const { sendDiscordWebhook } = require('./helpers/errorHandler');
const jwt = require('jsonwebtoken');
const { Exception } = require('handlebars');


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({
  noServer: true,
  verifyClient: (info, callback) => {
    const token = info.req.headers['sec-websocket-protocol'];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.userId) {
        console.log('[INFO] User authenticated:', decoded.userId);
        info.req.userId = decoded.userId;
        info.req.token = token;
        callback(true);
      } else {
        console.log('[INFO] User not authenticated');
        sendDiscordWebhook('Unauthorized WebSocket connection attempt from ' + info.req.connection.remoteAddress + ' with invalid token');
        callback(false, 401, 'Unauthorized');
      }
    } catch (error) {
      console.log('[INFO] User not authenticated with error:', error.message);
      sendDiscordWebhook('Unauthorized WebSocket connection attempt from ' + info.req.connection.remoteAddress + ' with error: ' + error.message);
      callback(false, 401, 'Unauthorized'); // Connection rejected
    }
  },
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

let clashClient; 

const startServer = async () => {
    try{
        clashClient = await initClashOfClansClient();
    } catch(e){
        console.log('[ERROR] Clash of Clans client failed to initialize' + e);
        throw Exception ('Clash of Clans client failed to initialize');
    }
    const connectedClients = new Set();
    wss.on('connection', (ws,req) => {
      connectedClients.add(ws);
      ws.on('error', (error) => {
        connectedClients.delete(ws);
        console.error('[ERROR] WebSocket error:', error.message);
      });

      ws.on('message', (message) => {
        if (Buffer.isBuffer(message)) {
          message = message.toString('utf-8');
        }
        console.log('[INFO] Received message:', message);
        if (typeof message === 'string' && message.startsWith('{')) {
          message = JSON.parse(message);
          if (message.type === 'getClanInfo') {
            clashClient.getClan(message.data.clanId)
              .then((response) => {
                ws.send(JSON.stringify(response));
              })
              .catch((error) => {
                console.error('[ERROR] Failed to get clan info:', error.message);
                ws.send(JSON.stringify({ error: error.message }));
              });
          } else if (message.type === 'getPlayersInfo') {
            clashClient.getPlayer(message.data.playerID)
              .then((response) => {
                ws.send(JSON.stringify(response));
              })
              .catch((error) => {
                console.error('[ERROR] Failed to get players info:', error.message);
                ws.send(JSON.stringify({ error: error.message }));
              });
          }
        }
      });

      wss.on('close', () => {
        connectedClients.delete(ws);
        const userId = req.userId;
        console.log('[INFO] WebSocket connection closed for userId: ', userId);
        });
      });

      const broadcast = (message) => {
        connectedClients.forEach(client => {
          try {
            client.send(message);
          } catch (error) {
            console.error('[ERROR] Failed to send message to a client:', error.message);
          }
        });
      };

    

      const PORT = process.env.PORT || 2228;
      server.listen(PORT, () => {
        console.log(`[INFO] Server started on port ${PORT}!`);
        sendDiscordWebhook('Server started on port ' + PORT, 'Server Started', 65280);
      });

};
startServer();