import path from 'path';

const __dirname = path.resolve();

export default {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  algorithm: 'aes-192-ccm',
  projectRoot: path.join(__dirname, '.'),
  availableLocals: process.env.AVAILABLE_LOCALS || '',
  defaultLanguage: process.env.DEFAULT_LANGUAGE || 'EN',
};
