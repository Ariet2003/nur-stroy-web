#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔄 Starting Prisma Client generation...');
console.log('📍 Current directory:', process.cwd());
console.log('📍 Node version:', process.version);
console.log('📍 Platform:', process.platform);

try {
  console.log('\n🚀 Running: prisma generate\n');
  
  execSync('npx prisma generate', {
    stdio: 'inherit',
    env: { ...process.env, PRISMA_HIDE_UPDATE_MESSAGE: '1' }
  });
  
  console.log('\n✅ Prisma Client generated successfully!');
  console.log('📦 Binary targets included:');
  console.log('   - native');
  console.log('   - rhel-openssl-1.0.x');
  console.log('   - rhel-openssl-3.0.x ✓');
  console.log('   - debian-openssl-1.1.x');
  console.log('   - debian-openssl-3.0.x');
  
} catch (error) {
  console.error('❌ Failed to generate Prisma Client:', error.message);
  process.exit(1);
}

