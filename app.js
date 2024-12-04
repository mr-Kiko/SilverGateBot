const axios = require('axios');

const TELEGRAM_TOKEN = '7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI'; // توکن ربات

async function getUpdates() {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates`;

  try {
    const response = await axios.get(url);
    const updates = response.data;

    console.log('آپدیت‌های دریافتی:', JSON.stringify(updates, null, 2));
  } catch (error) {
    console.error('خطا در دریافت آپدیت‌ها:', error);
  }
}

getUpdates();
