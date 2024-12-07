const axios = require('axios');
const { Telegraf } = require('telegraf');

// توکن ربات تلگرام
const TELEGRAM_BOT_TOKEN = '7922421871:AAGOql7sR7bI8fQ-qdKpYgj0fD2dA7TkPBI';
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// دریافت آپدیت‌های ربات و نمایش اطلاعات
async function fetchUpdates() {
  try {
    const updates = await bot.telegram.getUpdates();
    console.log('دریافت آپدیت‌ها:', JSON.stringify(updates, null, 2));
    if (updates.length > 0) {
      const chatId = updates[0].message.chat.id; // استخراج Chat ID اولین پیام
      console.log(`Chat ID گروه یا کاربر: ${chatId}`);
    } else {
      console.log('هیچ آپدیتی موجود نیست. لطفاً پیام یا دستوری به ربات ارسال کنید.');
    }
  } catch (error) {
    console.error('خطا در دریافت آپدیت‌ها:', error.message);
  }
}

// ارسال پیام تست به گروه یا کاربر
async function testSendMessage(chatId) {
  try {
    if (!chatId) {
      console.log('لطفاً ابتدا Chat ID را دریافت کنید.');
      return;
    }
    await bot.telegram.sendMessage(chatId, 'این یک پیام تست است!');
    console.log('پیام تست با موفقیت ارسال شد.');
  } catch (error) {
    console.error('خطا در ارسال پیام:', error.response ? error.response.description : error.message);
  }
}

// دریافت قیمت نقره از سایت
async function getSilverPrice() {
  try {
    const SILVER_PRICE_URL = 'https://www.tgju.org/profile/silver_999';
    const { data } = await axios.get(SILVER_PRICE_URL);
    // استخراج قیمت از HTML
    const match = data.match(/<span class="value">([\d,]+)<\/span>/);
    return match ? match[1].replace(/,/g, '') : null; // حذف کاما از عدد
  } catch (error) {
    console.error('خطا در دریافت قیمت نقره:', error.message);
    return null;
  }
}

// ارسال قیمت نقره به گروه یا کاربر
async function sendSilverPrice(chatId) {
  try {
    const price = await getSilverPrice();
    if (!price) {
      console.log('قیمت پیدا نشد.');
      return;
    }
    await bot.telegram.sendMessage(chatId, `قیمت لحظه‌ای نقره: ${price} تومان`);
    console.log('پیام قیمت نقره ارسال شد.');
  } catch (error) {
    console.error('خطا در ارسال قیمت نقره:', error.response ? error.response.description : error.message);
  }
}

// اجرا و تست
(async function main() {
  console.log('شروع برنامه...');
  await fetchUpdates(); // دریافت آپدیت‌ها و Chat ID
  const chatId = 'YOUR_CHAT_ID'; // مقدار Chat ID را پس از اجرای fetchUpdates اینجا قرار دهید
  await testSendMessage(chatId); // ارسال پیام تست
  await sendSilverPrice(chatId); // ارسال قیمت نقره
})();
