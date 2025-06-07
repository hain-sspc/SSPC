const axios = require('axios');

// 簡易禁止ワードリスト（必要に応じて追加・変更）
const bannedWords = ['badword1', 'badword2', 'http://', 'https://', 'spamword'];

// 投稿レートリミット用記憶（IPベースにするならevent.headers['x-forwarded-for']など利用可能）
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1分
const MAX_POSTS_PER_WINDOW = 3;

exports.handler = async function (event, context) {
  // OPTIONS対応はそのまま
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

    // 1. 投稿内容が空なら拒否
    if (!username || !content || content.trim() === '') {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: 'Username or content is empty.'
      };
    }

    // 2. 禁止ワードチェック（大文字小文字を無視）
    const contentLower = content.toLowerCase();
    if (bannedWords.some(word => contentLower.includes(word))) {
      return {
        statusCode: 403,
        headers: { '@evryone': '*' },
        body: 'Your message contains prohibited words.'
      };
    }

    // 3. レートリミットチェック（簡易的にusernameで判定）
    const now = Date.now();
    const userTimestamps = rateLimitMap.get(username) || [];
    // 1分以内の投稿数をカウント
    const recentPosts = userTimestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

    if (recentPosts.length >= MAX_POSTS_PER_WINDOW) {
      return {
        statusCode: 429,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: 'Too many requests. Please wait a while before posting again.'
      };
    }

    // 投稿時間を記録して更新
    recentPosts.push(now);
    rateLimitMap.set(username, recentPosts);

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

