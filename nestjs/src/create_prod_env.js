const fs = require('fs');

const envKeys = [
  'SERVER_HOST',
  'SERVER_PORT',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'CLIENT_ORIGINS',
  'SALT_ROUNDS',
];

const values = envKeys.map((key) => `${key}=${process.env[key]}`);

fs.writeFileSync('prod.env', values.join('\n'));