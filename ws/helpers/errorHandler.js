const axios = require('axios');

const sendDiscordWebhook = async (message, errorTitle, color) => {
  try {
    const webhookURL = process.env.DISCORD_WEBHOOK_URL; 
    if (!webhookURL) {
      throw new Error('[ERROR] Discord webhook URL not found in environment variables');
    }
    const embed = {
      title: errorTitle || 'Error',
      description: message,
      timestamp: new Date(),
      color: color || 16711680,
    };
    const payload = {
      embeds: [embed],
    };
    await axios.post(webhookURL, payload);
    console.log('[INFO] Discord webhook sent successfully');
  } catch (error) {
    console.error('[ERROR] Failed to send Discord webhook:', error.message);
  }
};
module.exports = {
  sendDiscordWebhook,
};
