// src/EncryptionUtil.ts
import CryptoJS from 'crypto-js';

class EncryptionUtil {
  private static instance: EncryptionUtil;
  private static readonly masterKey = 'U2FsdGVkX1+s6+Ind8COJ4SuKmseDDBVMXdBFYEWjJTo3+eEzCm3u52YBSW0OK4RIXH2lxZtg19Z8YTNdeKL7g==U2FsdGVkX18qgJrn9zj71hHxlymiQCK6Iosj2lZZ9Kk='; // Replace with your actual master key
  private rotatingKey: string;
  private readonly rotationInterval = 60000; // Rotate every 60 seconds for example

  private constructor() {
    this.rotatingKey = this.generateKey();
    this.rotateKey();
  }

  public static getInstance(): EncryptionUtil {
    if (!EncryptionUtil.instance) {
      EncryptionUtil.instance = new EncryptionUtil();
    }
    return EncryptionUtil.instance;
  }

  private generateKey(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }

  private rotateKey(): void {
    setInterval(() => {
      this.rotatingKey = this.generateKey();
    }, this.rotationInterval);
  }

  public encrypt(data: string): string {
    // Encrypt the rotating key with the static master key
    const encryptedRotatingKey = CryptoJS.AES.encrypt(this.rotatingKey, EncryptionUtil.masterKey).toString();
    // Ensure the length of the encrypted rotating key is fixed
    const fixedLengthKey = encryptedRotatingKey.padEnd(128, ' ');
    // Encrypt the data with the rotating key
    const encryptedData = CryptoJS.AES.encrypt(data, this.rotatingKey).toString();
    // Combine the fixed-length encrypted rotating key and the encrypted data
    return `${fixedLengthKey}${encryptedData}`;
  }

  public decrypt(ciphertext: string): string {
    // Extract the fixed-length encrypted rotating key and the actual encrypted data
    const fixedLengthKey = ciphertext.slice(0, 128);
    const encryptedData = ciphertext.slice(128);
    // Decrypt the rotating key with the static master key
    const rotatingKey = CryptoJS.AES.decrypt(fixedLengthKey.trim(), EncryptionUtil.masterKey).toString(CryptoJS.enc.Utf8);
    // Decrypt the data with the decrypted rotating key
    return CryptoJS.AES.decrypt(encryptedData, rotatingKey).toString(CryptoJS.enc.Utf8);
  }
}

export default EncryptionUtil.getInstance();
