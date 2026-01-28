#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

(async () => {
  console.log('\n🎨 Barbershop Configuration Wizard\n');
  console.log('This will help you set up or update your shop\'s configuration.\n');

  try {
    // Read existing settings if available
    const settingsPath = path.join(process.cwd(), 'data', 'settings.json');
    let existingSettings = {};
    
    if (fs.existsSync(settingsPath)) {
      existingSettings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    }

    // Gather information
    const businessName = await question(
      `Business Name [${existingSettings.businessName || 'Barbershop'}]: `
    ) || existingSettings.businessName || 'Barbershop';

    const address = await question(
      `Address [${existingSettings.address || ''}]: `
    ) || existingSettings.address || '';

    const phone = await question(
      `Phone [${existingSettings.phone || ''}]: `
    ) || existingSettings.phone || '';

    const email = await question(
      `Email [${existingSettings.email || ''}]: `
    ) || existingSettings.email || '';

    const facebook = await question(`Facebook URL (optional): `) || '';
    const instagram = await question(`Instagram URL (optional): `) || '';
    const twitter = await question(`Twitter URL (optional): `) || '';

    // Create updated settings
    const updatedSettings = {
      businessName,
      address,
      phone,
      email,
      hours: existingSettings.hours || {
        monday: '9:00 AM - 7:00 PM',
        tuesday: '9:00 AM - 7:00 PM',
        wednesday: '9:00 AM - 7:00 PM',
        thursday: '9:00 AM - 7:00 PM',
        friday: '9:00 AM - 7:00 PM',
        saturday: '9:00 AM - 6:00 PM',
        sunday: '10:00 AM - 4:00 PM',
      },
      theme: existingSettings.theme || {
        primary: '#1a1a1a',
        secondary: '#d4af37',
        accent: '#8b7355',
      },
      socialMedia: {
        facebook,
        instagram,
        twitter,
      },
    };

    // Save settings
    fs.writeFileSync(
      settingsPath,
      JSON.stringify(updatedSettings, null, 2)
    );

    console.log('\n✅ Configuration saved successfully!\n');
    console.log('📝 Updated settings.json');
    console.log(`   Business: ${businessName}`);
    console.log(`   Address: ${address}`);
    console.log(`   Phone: ${phone}`);
    console.log(`   Email: ${email}\n`);

    console.log('🎨 To customize theme colors, edit data/settings.json\n');

    rl.close();
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
})();
