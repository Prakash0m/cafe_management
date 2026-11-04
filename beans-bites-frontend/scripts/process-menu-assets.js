const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = '/Users/omprakeshsharma/.gemini/antigravity/brain/bfae34ae-d7f9-49b0-9f29-72251563e6da';
const publicDir = path.join(__dirname, '../public/assets');

async function processMenuAssets() {
  console.log('Processing Food Menu Assets...');

  // 1. Menu Banner Pizza
  const bannerSrc = path.join(brainDir, 'banner_pizza_header_1793778526636.jpg');
  const bannerDest = path.join(publicDir, 'menu/menu-banner-pizza.webp');
  if (fs.existsSync(bannerSrc)) {
    await sharp(bannerSrc)
      .resize(1200, 520, { fit: 'cover', position: 'center' })
      .webp({ quality: 94 })
      .toFile(bannerDest);
    console.log('[SUCCESS] menu-banner-pizza.webp generated');
  }

  // 2. Card 1: Margherita Pizza
  const pizzaSrc = path.join(brainDir, 'margherita_pizza_rustic_board_1793778465812.jpg');
  const pizzaDest = path.join(publicDir, 'food/pizza/margherita-pizza.webp');
  if (fs.existsSync(pizzaSrc)) {
    await sharp(pizzaSrc)
      .resize(600, 420, { fit: 'cover', position: 'center' })
      .webp({ quality: 92 })
      .toFile(pizzaDest);
    console.log('[SUCCESS] margherita-pizza.webp generated');
  }

  // 3. Card 2: Chicken Burger
  const burgerSrc = path.join(brainDir, 'gourmet_cheeseburger_1793714518931.jpg');
  const burgerDest = path.join(publicDir, 'food/burger/chicken-burger.webp');
  if (fs.existsSync(burgerSrc)) {
    await sharp(burgerSrc)
      .resize(600, 420, { fit: 'cover', position: 'center' })
      .webp({ quality: 92 })
      .toFile(burgerDest);
    console.log('[SUCCESS] chicken-burger.webp generated');
  }

  // 4. Card 3: Chicken Mo:Mo
  const momoSrc = path.join(brainDir, 'steamed_momo_plate_dark_1793778495363.jpg');
  const momoDest = path.join(publicDir, 'food/momo/chicken-momo.webp');
  if (fs.existsSync(momoSrc)) {
    await sharp(momoSrc)
      .resize(600, 420, { fit: 'cover', position: 'center' })
      .webp({ quality: 92 })
      .toFile(momoDest);
    console.log('[SUCCESS] chicken-momo.webp generated');
  }

  // 5. Card 4: Pasta Alfredo
  const pastaSrc = path.join(brainDir, 'creamy_pasta_bowl_1793714339831.jpg');
  const pastaDest = path.join(publicDir, 'food/pasta/pasta-alfredo.webp');
  if (fs.existsSync(pastaSrc)) {
    await sharp(pastaSrc)
      .resize(600, 420, { fit: 'cover', position: 'center' })
      .webp({ quality: 92 })
      .toFile(pastaDest);
    console.log('[SUCCESS] pasta-alfredo.webp generated');
  }

  // 6. Card 5: Veg Sandwich
  const sandwichSrc = path.join(brainDir, 'gourmet_sandwich_1793714399597.jpg');
  const sandwichDest = path.join(publicDir, 'food/sandwich/veg-sandwich.webp');
  if (fs.existsSync(sandwichSrc)) {
    await sharp(sandwichSrc)
      .resize(600, 420, { fit: 'cover', position: 'center' })
      .webp({ quality: 92 })
      .toFile(sandwichDest);
    console.log('[SUCCESS] veg-sandwich.webp generated');
  }

  // 7. Card 6: Caesar Salad
  const saladSrc = path.join(brainDir, 'fresh_garden_salad_1793714420201.jpg');
  const saladDest = path.join(publicDir, 'food/salad/caesar-salad.webp');
  if (fs.existsSync(saladSrc)) {
    await sharp(saladSrc)
      .resize(600, 420, { fit: 'cover', position: 'center' })
      .webp({ quality: 92 })
      .toFile(saladDest);
    console.log('[SUCCESS] caesar-salad.webp generated');
  }

  // 8. Card 7: Chocolate Brownie
  const brownieSrc = path.join(brainDir, 'brownie_with_icecream_1793778439610.jpg');
  const brownieDest = path.join(publicDir, 'food/desserts/chocolate-brownie.webp');
  if (fs.existsSync(brownieSrc)) {
    await sharp(brownieSrc)
      .resize(600, 420, { fit: 'cover', position: 'center' })
      .webp({ quality: 92 })
      .toFile(brownieDest);
    console.log('[SUCCESS] chocolate-brownie.webp generated');
  }

  // 9. Card 8: Iced Latte
  const latteSrc = path.join(brainDir, 'iced_latte_glass_1793778401684.jpg');
  const latteDest = path.join(publicDir, 'food/beverages/iced-latte.webp');
  if (fs.existsSync(latteSrc)) {
    await sharp(latteSrc)
      .resize(600, 420, { fit: 'cover', position: 'center' })
      .webp({ quality: 92 })
      .toFile(latteDest);
    console.log('[SUCCESS] iced-latte.webp generated');
  }

  console.log('All Menu Assets Processed Successfully!');
}

processMenuAssets().catch(console.error);
