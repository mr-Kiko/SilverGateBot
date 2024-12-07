const axios = require('axios');
const { Telegraf } = require('telegraf');

// توکن ربات تلگرام
const TELEGRAM_BOT_TOKEN = '7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI';
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// مقدار Chat ID گروه
const GROUP_CHAT_ID = '-4173284707'; // مقدار Chat ID گروه که ارائه دادید

// دریافت قیمت نقره از سایت
async function getSilverPrice() {
  try {
    const SILVER_PRICE_URL = 'https://www.tgju.org/profile/silver_999';
    const { data } = await axios.get(SILVER_PRICE_URL);
    // استخراج قیمت از HTML
    const match = data.match(/<span class="value">([\d,]+)<\/span>/); // به‌روزرسانی مسیر عنصر قیمت در صورت تغییر
    return match ? match[1].replace(/,/g, '') : null; // حذف کاما از عدد
  } catch (error) {
    console.error('خطا در دریافت قیمت نقره:', error.message);
    return null;
  }
}

// ارسال پیام تست به گروه
async function sendTestMessage() {
  try {
    await bot.telegram.sendMessage(GROUP_CHAT_ID, 'این یک پیام تست است!');
    console.log('پیام تست با موفقیت ارسال شد.');
  } catch (error) {
    console.error('خطا در ارسال پیام تست:', error.response ? error.response.description : error.message);
  }
}

// ارسال قیمت نقره به گروه
async function sendSilverPrice() {
  try {
    const price = await getSilverPrice();
    if (!price) {
      console.log('قیمت پیدا نشد.');
      return;
    }
    await bot.telegram.sendMessage(GROUP_CHAT_ID, `قیمت لحظه‌ای نقره: ${price} تومان`);
    console.log('پیام قیمت نقره ارسال شد.');
  } catch (error) {
    console.error('خطا در ارسال قیمت نقره:', error.response ? error.response.description : error.message);
  }
}

// اجرای تست
(async function main() {
  console.log('شروع برنامه...');
  await sendTestMessage(); // ارسال پیام تست
  await sendSilverPrice(); // ارسال قیمت نقره
})();
