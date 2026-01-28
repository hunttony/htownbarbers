#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Capture command line arguments
const args = process.argv.slice(2);
let shopName = '';
let shopCity = '';
let shopState = '';
let outputDir = '';

// Parse arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--name' && i + 1 < args.length) shopName = args[i + 1];
  if (args[i] === '--city' && i + 1 < args.length) shopCity = args[i + 1];
  if (args[i] === '--state' && i + 1 < args.length) shopState = args[i + 1];
  if (args[i] === '--output' && i + 1 < args.length) outputDir = args[i + 1];
}

// Validate inputs
if (!shopName || !shopCity || !shopState) {
  console.error('❌ Missing required arguments!');
  console.log('\nUsage: npm run create-shop -- --name "Shop Name" --city "City" --state "ST" [--output "./path"]');
  console.log('\nExample:');
  console.log('  npm run create-shop -- --name "Antonio\'s Barbershop" --city "Austin" --state "TX"');
  process.exit(1);
}

// Create shop folder name
const shopFolderName = `${shopCity.toLowerCase()}-barbers`;
const targetDir = outputDir || path.join(process.cwd(), '..', shopFolderName);

console.log('\n🔧 Creating new barbershop site...');
console.log(`   Shop: ${shopName}`);
console.log(`   City: ${shopCity}, ${shopState}`);
console.log(`   Output: ${targetDir}\n`);

try {
  // 1. Copy template directory
  console.log('📋 Copying template files...');
  execSync(`xcopy "." "${targetDir}" /E /I /Y`, { stdio: 'inherit' });

  // 2. Create .env.local with shop-specific settings
  console.log('⚙️  Generating configuration...');
  const envContent = generateEnv(shopName, shopCity, shopState);
  fs.writeFileSync(path.join(targetDir, '.env.local'), envContent);

  // 3. Update settings.json
  console.log('📝 Updating settings...');
  const settingsContent = generateSettings(shopName, shopCity, shopState);
  fs.writeFileSync(
    path.join(targetDir, 'data', 'settings.json'),
    JSON.stringify(settingsContent, null, 2)
  );

  // 4. Update package.json with shop name
  console.log('📦 Updating package.json...');
  const packagePath = path.join(targetDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.name = shopFolderName;
  packageJson.description = `${shopName} - Premium Barbershop in ${shopCity}, ${shopState}`;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

  // 5. Update metadata in layout.tsx
  console.log('🎨 Updating page metadata...');
  updateLayoutMetadata(targetDir, shopName, shopCity, shopState);

  // 6. Create .gitignore if it doesn't exist
  if (!fs.existsSync(path.join(targetDir, '.gitignore'))) {
    fs.copyFileSync(
      path.join(__dirname, '.gitignore'),
      path.join(targetDir, '.gitignore')
    );
  }

  // 7. Initialize git repo
  console.log('🚀 Initializing Git repository...');
  const currentDir = process.cwd();
  process.chdir(targetDir);
  try {
    execSync('git init');
    execSync('git add .');
    execSync(`git commit -m "Initial commit: ${shopName} website template"`);
  } catch (err) {
    console.log('   ℹ️  Git setup skipped (may already be initialized)');
  }
  process.chdir(currentDir);

  console.log('\n✅ Shop site created successfully!\n');
  console.log('📖 Next steps:');
  console.log(`   1. cd ${targetDir}`);
  console.log('   2. npm install');
  console.log('   3. npm run dev');
  console.log('\n📝 To customize further, edit:');
  console.log('   - .env.local (environment variables)');
  console.log('   - data/settings.json (business info)');
  console.log('   - data/gallery.json (photos)');
  console.log('\n');

} catch (error) {
  console.error('\n❌ Error creating shop:', error.message);
  process.exit(1);
}

function generateEnv(shopName, city, state) {
  return `# Auto-generated configuration for ${shopName}
# Created: ${new Date().toISOString()}

SHOP_NAME=${shopName}
SHOP_CITY=${city}
SHOP_STATE=${state}
SHOP_PHONE=
SHOP_EMAIL=
SHOP_ADDRESS=

SHOP_HOURS_MONDAY=9:00 AM - 7:00 PM
SHOP_HOURS_TUESDAY=9:00 AM - 7:00 PM
SHOP_HOURS_WEDNESDAY=9:00 AM - 7:00 PM
SHOP_HOURS_THURSDAY=9:00 AM - 7:00 PM
SHOP_HOURS_FRIDAY=9:00 AM - 7:00 PM
SHOP_HOURS_SATURDAY=9:00 AM - 6:00 PM
SHOP_HOURS_SUNDAY=10:00 AM - 4:00 PM

THEME_PRIMARY=#1a1a1a
THEME_SECONDARY=#d4af37
THEME_ACCENT=#8b7355

SOCIAL_FACEBOOK=
SOCIAL_INSTAGRAM=
SOCIAL_TWITTER=

META_TITLE=${shopName} - Premium Barbershop in ${city}, ${state}
META_DESCRIPTION=Premier barbershop in ${city}, ${state} offering expert haircuts, beard trims, and grooming services.
`;
}

function generateSettings(shopName, city, state) {
  return {
    businessName: shopName,
    address: `[Address], ${city}, ${state}`,
    phone: '(XXX) XXX-XXXX',
    email: 'info@example.com',
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '10:00 AM - 4:00 PM'
    },
    theme: {
      primary: '#1a1a1a',
      secondary: '#d4af37',
      accent: '#8b7355'
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  };
}

function updateLayoutMetadata(targetDir, shopName, city, state) {
  const layoutPath = path.join(targetDir, 'app', 'layout.tsx');
  let content = fs.readFileSync(layoutPath, 'utf8');
  
  const newTitle = `${shopName} - Premium Barbershop in ${city}, ${state}`;
  const newDescription = `Premier barbershop in ${city}, ${state} offering expert haircuts, beard trims, and grooming services.`;

  content = content.replace(
    /title: ".*?"/,
    `title: "${newTitle}"`
  );
  content = content.replace(
    /description: ".*?"/,
    `description: "${newDescription}"`
  );

  fs.writeFileSync(layoutPath, content);
}
