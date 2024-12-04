const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

// توکن ربات تلگرام و آیدی گروه
const TELEGRAM_BOT_TOKEN = 'bot7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI';
const GROUP_CHAT_ID = '-1002305142578'; // Chat ID of the group

// آدرس سایت نقره
const SILVER_PRICE_URL = 'https://www.tgju.org/profile/silver_999';

// ارسال پیام به گروه تلگرام
async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const params = {
    chat_id: GROUP_CHAT_ID,
    text: message,
  };
  await fetch(url, { method: 'POST', body: JSON.stringify(params), headers: { 'Content-Type': 'application/json' } });
}

// استخراج قیمت نقره از سایت
async function getSilverPrice() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(SILVER_PRICE_URL, { waitUntil: 'domcontentloaded' });

  // استخراج قیمت از سایت
  const price = await page.evaluate(() => {
    const priceElement = document.querySelector('body main div div div div div div h3 span span');
    return priceElement ? priceElement.textContent.trim() : null;
  });

  await browser.close();
  return price;
}

// ارسال قیمت نقره به گروه تلگرام هر 10 ثانیه
async function sendPriceToTelegram() {
  try {
    const price = await getSilverPrice();
    if (price) {
      await sendTelegramMessage(`قیمت لحظه‌ای نقره: ${price}`);
    } else {
      console.log('قیمت پیدا نشد');
    }
  } catch (error) {
    console.error('خطا در استخراج یا ارسال قیمت:', error);
  }
}

// ارسال هر 10 ثانیه یکبار
setInterval(sendPriceToTelegram, 10000); // برای تست، هر 10 ثانیه یکبار
