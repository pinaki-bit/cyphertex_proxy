import { EncryptionAlgorithm, SecurityAnalysis } from '../core/interfaces/EncryptionAlgorithm';

export class AffineCipher implements EncryptionAlgorithm {
  private gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  private modInverse(a: number, m: number): number {
    for (let i = 1; i < m; i++) {
      if ((a * i) % m === 1) {
        return i;
      }
    }
    throw new Error(`Modular inverse does not exist for a=${a} and m=${m}`);
  }

  private parseKey(key: any): { a: number, b: number } {
    let a: number, b: number;
    if (typeof key === 'string') {
      const parts = key.split(',');
      a = parseInt(parts[0], 10);
      b = parseInt(parts[1], 10);
    } else if (typeof key === 'object') {
      a = parseInt(key.a, 10);
      b = parseInt(key.b, 10);
    } else {
      throw new Error('Invalid key format for Affine Cipher');
    }

    if (isNaN(a) || isNaN(b)) {
      throw new Error('Key parameters must be numbers');
    }

    if (this.gcd(a, 26) !== 1) {
      throw new Error(`The value "a" (${a}) must be coprime with 26.`);
    }

    return { a, b };
  }

  encrypt(text: string, key: any): string {
    const { a, b } = this.parseKey(key);
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const x = char.charCodeAt(0) - base;
        
        const encrypted = (a * x + b) % 26;
        result += String.fromCharCode(encrypted + base);
      } else {
        result += char;
      }
    }
    return result;
  }

  decrypt(text: string, key: any): string {
    const { a, b } = this.parseKey(key);
    const aInv = this.modInverse(a, 26);
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const x = char.charCodeAt(0) - base;
        
        let decrypted = (aInv * (x - b)) % 26;
        if (decrypted < 0) decrypted += 26;
        
        result += String.fromCharCode(decrypted + base);
      } else {
        result += char;
      }
    }
    return result;
  }

  analyze(text: string): SecurityAnalysis {
    return {
      algorithmName: 'Affine Cipher',
      securityLevel: 'LOW',
      estimatedKeySpace: '312 keys',
      attackResistance: 'VERY LOW',
      recommendedUseCase: 'Math logic demonstration',
      modernRelevance: 'EDUCATIONAL ONLY'
    };
  }

  getMetadata() {
    return {
      name: 'Affine Cipher',
      category: 'Substitution',
      securityLevel: 'LOW',
      description: 'A type of monoalphabetic substitution cipher, where each letter in an alphabet is mapped to its numeric equivalent, encrypted using a simple mathematical function.',
      yearInvented: 'Antiquity',
      keySpace: '312 keys (12 coprimes of 26 * 26 possible shifts)',
      modernUsage: 'Mathematical exercise',
      recommendedUseCases: 'Learning about modular arithmetic and coprimes'
    };
  }
}
