const axios = require('axios');
const { Telegraf } = require('telegraf');

// توکن ربات تلگرام و آیدی گروه
const TELEGRAM_BOT_TOKEN = '7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI';
const GROUP_CHAT_ID = '-1002305142578'; // Chat ID of the group

// آدرس سایت نقره
const SILVER_PRICE_URL = 'https://www.tgju.org/profile/silver_999';

// تنظیم ربات تلگرام با استفاده از Telegraf
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// استخراج قیمت نقره از سایت
async function getSilverPrice() {
  try {
    const { data } = await axios.get(SILVER_PRICE_URL);
    // استخراج قیمت از HTML
    const match = data.match(/<span class="value">([\d,]+)<\/span>/);
    return match ? match[1].replace(/,/g, '') : null; // حذف کاما از عدد
  } catch (error) {
    console.error('خطا در دریافت قیمت نقره:', error.message);
    return null;
  }
}

// ارسال پیام به گروه تلگرام
async function sendTelegramMessage(message) {
  try {
    await bot.telegram.sendMessage(GROUP_CHAT_ID, message);
    console.log('پیام ارسال شد:', message);
  } catch (error) {
    console.error('خطا در ارسال پیام تلگرام:', error.message);
  }
}

// ارسال قیمت نقره به گروه تلگرام هر 12 ساعت
async function sendPriceToTelegram() {
  const price = await getSilverPrice();
  if (price) {
    await sendTelegramMessage(`قیمت لحظه‌ای نقره: ${price} تومان`);
  } else {
    console.log('قیمت پیدا نشد.');
  }
}

// شروع زمان‌بندی
setInterval(sendPriceToTelegram, 12 * 60 * 60 * 1000); // هر 12 ساعت یکبار

// شروع ربات
bot.launch().then(() => console.log('ربات شروع به کار کرد.'));
