const axios = require('axios');

const botToken = '7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI';  // توکن ربات شما
const groupId = '-1002305142578'; // شناسه گروه شما
const message = 'سلام';

const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

axios.post(url, {
  chat_id: groupId,
  text: message
})
.then(response => {
  console.log('Message sent successfully:', response.data);
})
.catch(error => {
  console.log('Error sending message:', error.response ? error.response.data : error.message);
});
