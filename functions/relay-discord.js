const axios = require('axios');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { username, content } = JSON.parse(event.body);

    const webhookUrl = 'https://discordapp.com/api/webhooks/1380740660637728849/1nYUnAf-v6moGCa3dxtzIAbFeQdOPtzMn_9pbDiyks7Z-F6cKkFvKEFLLr6-An2cXNWO'; // ここを置き換える

    await axios.post(webhookUrl, {
      username,
      content
    });

    return {
      statusCode: 200,
      body: 'Message relayed to Discord!'
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'Error sending message.'
    };
  }
};
