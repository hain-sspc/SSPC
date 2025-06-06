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

    const webhookUrl = 'https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN'; // ここを置き換える

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
