const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = '/Users/omprakeshsharma/.gemini/antigravity/brain/bfae34ae-d7f9-49b0-9f29-72251563e6da';
const outDir = path.join(__dirname, '../public/assets/categories');
const foodOutDir = path.join(__dirname, '../public/assets/food');

const categories = [
  { name: 'pizza', src: path.join(brainDir, 'pizza_slice_appetizing_1793714493640.jpg') },
  { name: 'burger', src: path.join(brainDir, 'gourmet_cheeseburger_1793714518931.jpg') },
  { name: 'pasta', src: path.join(brainDir, 'creamy_pasta_bowl_1793714339831.jpg') },
  { name: 'momo', src: path.join(brainDir, 'steamed_momo_dumplings_1793714552835.jpg') },
  { name: 'sandwich', src: path.join(brainDir, 'gourmet_sandwich_1793714399597.jpg') },
  { name: 'salad', src: path.join(brainDir, 'fresh_garden_salad_1793714420201.jpg') },
  { name: 'snacks', src: path.join(brainDir, 'crispy_french_fries_snacks_1793714443033.jpg') },
  { name: 'desserts', src: path.join(brainDir, 'chocolate_cake_dessert_1793714469335.jpg') },
  { name: 'beverages', src: path.join(brainDir, 'hot_cappuccino_coffee_1793714580599.jpg') },
];

const targetSize = 256;

// Anti-aliased circular mask SVG
const circularMask = Buffer.from(
  `<svg width="${targetSize}" height="${targetSize}"><circle cx="${targetSize / 2}" cy="${targetSize / 2}" r="${targetSize / 2}" fill="#fff" /></svg>`
);

async function run() {
  for (const item of categories) {
    if (!fs.existsSync(item.src)) {
      console.error(`Source missing for ${item.name}: ${item.src}`);
      continue;
    }

    // Step 1: Resize the 1024x1024 food photo to 256x256 with high quality lanczos3
    // Since it's already centered on a pure white background, we fit inside 240x240 on a 256x256 pure white canvas
    const foodResized = await sharp(item.src)
      .resize(240, 240, { fit: 'inside' })
      .png()
      .toBuffer();

    // Composite centered on pure white 256x256 canvas
    const composited = await sharp({
      create: {
        width: targetSize,
        height: targetSize,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{ input: foodResized, gravity: 'center' }])
      .png()
      .toBuffer();

    // Apply circular alpha mask for pristine round rendering without any edge artifacts
    const finalWebp = await sharp(composited)
      .composite([{ input: circularMask, blend: 'dest-in' }])
      .webp({ quality: 95, effort: 6 })
      .toBuffer();

    const destPath = path.join(outDir, `${item.name}.webp`);
    fs.writeFileSync(destPath, finalWebp);

    // Verify top 20 rows of center pixels for any dark pixels
    const { data, info } = await sharp(finalWebp).raw().toBuffer({ resolveWithObject: true });
    let darkPixels = 0;
    for (let y = 0; y < 20; y++) {
      for (let x = 64; x < 192; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
        // If not white and not transparent
        if (a > 50 && (r < 220 || g < 220 || b < 220)) {
          darkPixels++;
        }
      }
    }

    console.log(`[SUCCESS] ${item.name}.webp (${finalWebp.length} bytes) - dark pixels in top rows: ${darkPixels}`);
  }

  // Update popular food items as well with full HD assets
  // Pasta Alfredo:
  const pastaFoodPath = path.join(foodOutDir, 'pasta/pasta-alfredo.webp');
  await sharp(path.join(brainDir, 'creamy_pasta_bowl_1793714339831.jpg'))
    .resize(600, 600, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(pastaFoodPath);
  console.log('[SUCCESS] Updated pasta-alfredo.webp with Full HD photo');

  // Margherita Pizza:
  const pizzaFoodPath = path.join(foodOutDir, 'pizza/margherita-pizza.webp');
  await sharp(path.join(brainDir, 'pizza_slice_appetizing_1793714493640.jpg'))
    .resize(600, 600, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(pizzaFoodPath);
  console.log('[SUCCESS] Updated margherita-pizza.webp with Full HD photo');

  // Chicken Momo:
  const momoFoodPath = path.join(foodOutDir, 'momo/chicken-momo.webp');
  await sharp(path.join(brainDir, 'steamed_momo_dumplings_1793714552835.jpg'))
    .resize(600, 600, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(momoFoodPath);
  console.log('[SUCCESS] Updated chicken-momo.webp with Full HD photo');

  // Chicken Burger:
  const burgerFoodPath = path.join(foodOutDir, 'burger/chicken-burger.webp');
  await sharp(path.join(brainDir, 'gourmet_cheeseburger_1793714518931.jpg'))
    .resize(600, 600, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(burgerFoodPath);
  console.log('[SUCCESS] Updated chicken-burger.webp with Full HD photo');
}

run().catch(console.error);
