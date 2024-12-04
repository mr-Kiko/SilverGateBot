const puppeteer = require('puppeteer');
const axios = require('axios');

// آدرس صفحه‌ای که قیمت در آن قرار دارد
const url = 'https://www.tgju.org/profile/silver_999';
const chatId = '-1002305142578'; // شناسه گروه

// تابع برای استخراج قیمت با استفاده از Puppeteer
async function getSilverPrice() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // استخراج قیمت نقره با XPath
  const price = await page.$eval(
    '/html/body/main/div[1]/div[1]/div[1]/div/div[2]/div/h3[1]/span[2]/span[1]',
    el => el.textContent.trim()
  );

  await browser.close();
  return price;
}

// تابع برای ارسال پیام به گروه تلگرام
async function sendMessageToTelegram(message) {
  const botToken = 'bot7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI';
  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message
    });
    console.log('Message sent: ', message);
  } catch (error) {
    console.error('Error sending message: ', error);
  }
}

// ارسال قیمت هر ۱۰ ثانیه
setInterval(async () => {
  const price = await getSilverPrice();
  const message = `قیمت نقره ۹۹۹: ${price}`;
  await sendMessageToTelegram(message);
}, 10000); // هر ۱۰ ثانیه یکبار ارسال می‌شود
