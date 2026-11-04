const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const userBannerPath = '/Users/omprakeshsharma/.gemini/antigravity/brain/bfae34ae-d7f9-49b0-9f29-72251563e6da/.user_uploaded/media_1793779183304_3d36ca62.jpg';
const origPizzaPath = '/Users/omprakeshsharma/.gemini/antigravity/brain/bfae34ae-d7f9-49b0-9f29-72251563e6da/.user_uploaded/media_1793710895381_b7158889.jpg';

const heroSlide5Path = path.join(__dirname, '../public/assets/hero/hero-slide-5.webp');
const menuBannerPizzaPath = path.join(__dirname, '../public/assets/menu/menu-banner-pizza.webp');

async function run() {
  console.log('Generating Hero Slide 5 and Menu Banner...');

  // 1. Create 1024x450 Hero Slide 5
  // Resize original high-res pizza to 1024x450 cover, focusing on the pizza pull and brick oven
  await sharp(origPizzaPath)
    .resize(1024, 450, { fit: 'cover', position: 'right' })
    .webp({ quality: 95 })
    .toFile(heroSlide5Path);
  console.log('[SUCCESS] hero-slide-5.webp created (1024x450)');

  // 2. Also update menu-banner-pizza.webp with the high-res pizza pull and oven
  await sharp(origPizzaPath)
    .resize(800, 500, { fit: 'cover', position: 'center' })
    .webp({ quality: 95 })
    .toFile(menuBannerPizzaPath);
  console.log('[SUCCESS] menu-banner-pizza.webp updated (800x500)');
}

run().catch(console.error);
