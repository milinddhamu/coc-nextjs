const express = require('express');
const axios = require('axios');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
app.prepare().then(() => {
  const server = express();

  server.get('/api/clanDatabase/:clanInfo', async (req, res) => {
    const { clanInfo } = req.params;
    const options = {
      method: 'GET',
      url: `https://api.clashofclans.com/v1/clans/%23${clanInfo}`,
      headers: {
        Authorization: `Bearer ${process.env.COC_API}`,
      },
    };

    try {
      const response = await axios.request(options);
      const clanData = response.data;
      const memberTags = clanData.memberList.map((member) => member.tag.replace('#', '')); // Remove the # symbol
      
      // Fetch player data for each member in parallel
      const playerDataPromises = memberTags.map(async (tag) => {
        const playerOptions = {
          method: 'GET',
          url: `https://api.clashofclans.com/v1/players/%23${tag}`,
          headers: {
            Authorization: `Bearer ${process.env.COC_API}`,
          },
        };
        const playerResponse = await axios.request(playerOptions);
        return playerResponse.data;
      });

      // Wait for all player data to be fetched
      const playerData = await Promise.all(playerDataPromises);

      // Combine clan data and player data into a single response
      const responseData = {
        clan: clanData,
        players: playerData,
      };

      res.json(responseData);
      } catch (error) {
      res.json(null);
    }
  });

  server.get('/api/playerDatabase/:playerInfo', async (req, res) => {
    const { playerInfo } = req.params;
    const apiUrls = [
      `https://api.clashofclans.com/v1/players/%23${playerInfo}`,
      `https://api.clashofclans.com/v1/goldpass/seasons/current`
    ];
  
    const axiosRequests = apiUrls.map(url => axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.COC_API}`
      }
    }));
  
    try {
      const responses = await Promise.all(axiosRequests);
      const data = responses.map(response => response.data);
  
      res.json(data);
    } catch (error) {
      res.json(null);
    }
  });
  

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})

.catch((ex) => {
  process.exit(1)
});
