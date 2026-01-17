import * as crypto from 'crypto';
import fs from 'fs';

export interface Encryption {
  encryptedData: string,
  encryptedKey: string
  iv: string,
  authTag: string
}

function encryptPublic(publicKey: string, data: Buffer): Buffer {
  return crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  }, data);
}

function decryptPrivate(privateKey: string, encryptedData: Buffer): Buffer {
  return crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  }, encryptedData);
}

export function encryptData(data: string): Encryption {
  const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH!!, 'utf-8');
  const symmetricKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', symmetricKey, iv);
  const encryptedData = Buffer.concat([
    cipher.update(data, 'utf8'),
    cipher.final(),
  ]);
  const encryptedKey = encryptPublic(publicKey, symmetricKey);

  return {
    encryptedData: encryptedData.toString('hex'),
    encryptedKey: encryptedKey.toString('hex'),
    iv: iv.toString('hex'),
    authTag: cipher.getAuthTag().toString('hex'),
  };
}

export function decryptData(encryptedSymmetricKey: string, iv: string, encryptedData: string, authTag: string): string {
  const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH!!, 'utf-8');
  const symmetricKey = decryptPrivate(privateKey, Buffer.from(encryptedSymmetricKey, 'hex'));
  const decipher = crypto.createDecipheriv('aes-256-gcm', symmetricKey, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  const decryptedData = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'hex')),
    decipher.final(),
  ]);
  return decryptedData.toString('utf8');
}