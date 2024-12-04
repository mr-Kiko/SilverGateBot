const axios = require('axios');
const botToken = '7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI';  // توکن ربات شما
const groupId = '-4173284707';  // شناسه گروه شما

// بررسی اطلاعات گروه
async function getGroupInfo() {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${botToken}/getChat`, {
      chat_id: groupId
    });
    console.log('اطلاعات گروه:', response.data);
  } catch (error) {
    console.error('خطا در دریافت اطلاعات گروه:', error);
  }
}

getGroupInfo();
