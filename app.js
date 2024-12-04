const axios = require('axios');
const botToken = '7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI';  // توکن ربات شما
const groupId = '-4173284707';  // شناسه گروه شما

// تابع برای ارسال پیام
async function sendMessage() {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: groupId,
      text: 'سلام'
    });
    console.log('پیام ارسال شد:', response.data);
  } catch (error) {
    console.error('خطا در ارسال پیام:', error);
  }
}

// ارسال پیام هر 5 ثانیه
setInterval(sendMessage, 5000);  // 5000 میلی‌ثانیه معادل 5 ثانیه
