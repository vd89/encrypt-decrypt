import crypto from 'crypto';
import appConfig from '../appConfig.js';
import debug from 'debug';
import { Buffer } from 'buffer';
const appLog = debug('app:helper ->>> ');

const { algorithm } = appConfig;
export const generateRandomString = (_length) => {
  return crypto
    .randomBytes(Math.ceil(_length / 2))
    .toString('hex')
    .slice(0, _length);
};

export const hashString = (_value, _salt) => {
  const hash = crypto.createHmac('sha512', _salt);
  hash.update(_value);
  return hash.digest('hex');
};

export const encrypt = async (_text, encryptionKey) => {
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv, {
    authTagLength: 16,
  });
  let encrypted = cipher.update(_text);
  appLog(encrypted);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = async (_text, _encryptionKey) => {
  const textParts = _text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(_encryptionKey), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
