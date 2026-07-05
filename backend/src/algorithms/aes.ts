import crypto from 'crypto';
import { EncryptionAlgorithm, SecurityAnalysis } from '../core/interfaces/EncryptionAlgorithm';

export class AESCipher implements EncryptionAlgorithm {
  encrypt(text: string, key: any): string {
    const password = String(key);
    // Securely derive 32 byte key and 16 byte IV from the password
    const salt = crypto.randomBytes(16);
    const derivedKey = crypto.scryptSync(password, salt, 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', derivedKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Prepend salt and iv to the ciphertext for decryption
    return `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted}`;
  }

  decrypt(text: string, key: any): string {
    const password = String(key);
    const parts = text.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid AES ciphertext format. Expected salt:iv:ciphertext');
    }

    const salt = Buffer.from(parts[0], 'hex');
    const iv = Buffer.from(parts[1], 'hex');
    const encryptedText = parts[2];

    const derivedKey = crypto.scryptSync(password, salt, 32);

    const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  analyze(text: string): SecurityAnalysis {
    return {
      algorithmName: 'AES-256',
      securityLevel: 'VERY HIGH',
      estimatedKeySpace: '2^256',
      attackResistance: 'EXTREMELY HIGH',
      recommendedUseCase: 'Secure data storage, communications',
      modernRelevance: 'ENTERPRISE STANDARD'
    };
  }

  getMetadata() {
    return {
      name: 'Advanced Encryption Standard (AES-256)',
      category: 'Symmetric Block Cipher',
      securityLevel: 'VERY HIGH',
      description: 'A symmetric encryption algorithm established by the U.S. NIST. AES-256 is the strongest variant, using a 256-bit key size.',
      yearInvented: '2001',
      keySpace: '1.15 x 10^77',
      modernUsage: 'Government, banking, internet security (TLS/SSL)',
      recommendedUseCases: 'Securing sensitive data and communications'
    };
  }
}
