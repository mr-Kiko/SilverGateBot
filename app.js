const axios = require('axios');
const botToken = '7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI';

async function getUpdates() {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const updates = response.data.result;
    
    updates.forEach(update => {
      if (update.message && update.message.chat.type !== 'private') {  // فیلتر کردن پیام‌های گروه
        console.log(update.message.chat.id);  // نمایش شناسه گروه
        console.log(update.message.text);     // نمایش متن پیام
      }
    });
  } catch (error) {
    console.error('Error getting updates:', error);
  }
}

getUpdates();
