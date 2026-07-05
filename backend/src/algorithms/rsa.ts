import crypto from 'crypto';
import { EncryptionAlgorithm, SecurityAnalysis } from '../core/interfaces/EncryptionAlgorithm';

export class RSACipher implements EncryptionAlgorithm {
  // Helper to generate keys on the fly if needed
  static generateKeys() {
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });
  }

  encrypt(text: string, key: any): string {
    let publicKey = key;
    if (typeof key === 'object' && key.publicKey) {
      publicKey = key.publicKey;
    }
    
    if (!publicKey || typeof publicKey !== 'string') {
      throw new Error('RSA encryption requires a valid PEM formatted public key.');
    }

    try {
      // 2048-bit RSA with PKCS1 padding max payload is ~245 bytes. We'll use 200 bytes for safety.
      const CHUNK_SIZE = 200;
      const buffer = Buffer.from(text, 'utf8');
      const chunks = [];
      
      for (let i = 0; i < buffer.length; i += CHUNK_SIZE) {
        const chunk = buffer.subarray(i, i + CHUNK_SIZE);
        const encryptedChunk = crypto.publicEncrypt(publicKey, chunk);
        chunks.push(encryptedChunk.toString('hex'));
      }
      
      // Join chunks with a delimiter (colon)
      return chunks.join(':');
    } catch (err: any) {
      throw new Error(`RSA Encryption failed: ${err.message}`);
    }
  }

  decrypt(text: string, key: any): string {
    let privateKey = key;
    if (typeof key === 'object' && key.privateKey) {
      privateKey = key.privateKey;
    }

    if (!privateKey || typeof privateKey !== 'string') {
      throw new Error('RSA decryption requires a valid PEM formatted private key.');
    }

    try {
      const chunks = text.split(':');
      const decryptedChunks = chunks.map(chunkHex => {
        const chunkBuffer = Buffer.from(chunkHex, 'hex');
        return crypto.privateDecrypt(privateKey, chunkBuffer);
      });
      
      return Buffer.concat(decryptedChunks).toString('utf8');
    } catch (err: any) {
      throw new Error(`RSA Decryption failed: ${err.message}`);
    }
  }

  analyze(text: string): SecurityAnalysis {
    return {
      algorithmName: 'RSA',
      securityLevel: 'VERY HIGH',
      estimatedKeySpace: '2^2048 (typical key size)',
      attackResistance: 'EXTREMELY HIGH',
      recommendedUseCase: 'Key exchange, digital signatures',
      modernRelevance: 'ENTERPRISE STANDARD'
    };
  }

  getMetadata() {
    return {
      name: 'RSA (Rivest-Shamir-Adleman)',
      category: 'Asymmetric Public-Key Cryptography',
      securityLevel: 'VERY HIGH',
      description: 'The standard asymmetric encryption algorithm based on the practical difficulty of factoring the product of two large prime numbers.',
      yearInvented: '1977',
      keySpace: 'Variable (typically 2048 to 4096 bits)',
      modernUsage: 'HTTPS, secure emails, code signing',
      recommendedUseCases: 'Secure key exchange and authentication'
    };
  }
}
