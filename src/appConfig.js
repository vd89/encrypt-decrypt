export default {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  algorithm: 'aes-256-cbc',
  availableLocals: process.env.AVAILABLE_LOCALS || '',
  defaultLanguage: process.env.DEFAULT_LANGUAGE || '',
};
