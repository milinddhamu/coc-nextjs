const { Client } = require('clashofclans.js');
const client = new Client()

const initClashOfClansClient = async () => {
    try{
        client.login(
            {
                email: process.env.COC_EMAIL,
                password: process.env.COC_PASSWORD,
            }
        ).then(() => {
            console.log('[INFO] Clash of Clans client logged in');
        });
    }catch(e){
        console.log('[ERROR] Clash of Clans client failed to log in' + e);
    }
    return client;
}

module.exports = { initClashOfClansClient };
