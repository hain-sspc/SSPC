const axios = require('axios');

exports.handler = async function (event, context) {
  // ✅ OPTIONSメソッド（プリフライトリクエスト）への対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: 'OK'
    };
  }

  // ❌ POST以外のメソッドは拒否
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: 'Method Not Allowed'
    };
  }

  try {
    const { username, content } = JSON.parse(event.body);

    const webhookUrl = 'https://discordapp.com/api/webhooks/1380789460811387062/rd7cai7YWy56iJ1aQ-8FTsmAf_qNI0JFWDT6PNrwrF31bUdzc3U2lR7ohuhenkC_hMYy';

    await axios.post(webhookUrl, {
      username,
      content
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: 'Message relayed to Discord!'
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: 'Error sending message.'
    };
  }
};

