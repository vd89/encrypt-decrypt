import debug from 'debug';
import { encrypt, generateRandomString } from '../helper/index.js';
import crypto from 'crypto';
import Buffer from 'buffer';
const appLog = debug('app:controller ->');

class ApiController {
  async healthCheck(req, res, next) {
    try {
      const date = new Date();
      const key = generateRandomString(24);
      const nonce = crypto.randomBytes(12);
      const aad = Buffer.Buffer.from('1234567890', 'hex');
      const cipher = crypto.createCipheriv('aes-192-ccm', key, nonce, {
        authTagLength: 16,
      });
      const plainText = 'thisisalongtextwithmanynewthingstosay';
      const encryptedText = encrypt(plainText, key);
      cipher.setAAD(aad, { plaintextLength: Buffer.Buffer.byteLength(plainText) });
      const cipherText = cipher.update(plainText, 'utf8');
      const testData = {
        testDetails: 'the Server is working',
        randomString: key,
        timeStamp: {
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
          timeStamp: date.getTime(),
        },
        cipherText: cipherText.toString('hex'),
        encryptedText,
        // encryptText: await encrypt('This is text', randomString),
      };
      return res.ok({ data: testData });
    } catch (e) {
      appLog(e.message);
      next(e);
    }
  }
}

export default ApiController;
