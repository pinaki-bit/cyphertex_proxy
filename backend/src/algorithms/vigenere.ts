import { EncryptionAlgorithm, SecurityAnalysis } from '../core/interfaces/EncryptionAlgorithm';

export class VigenereCipher implements EncryptionAlgorithm {
  private process(text: string, key: string, decrypt: boolean): string {
    const keyword = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (!keyword) throw new Error('Vigenère cipher requires an alphabetic keyword');

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const p = char.charCodeAt(0) - base;
        
        const kChar = keyword[keyIndex % keyword.length];
        const k = kChar.charCodeAt(0) - 65;

        let shifted;
        if (decrypt) {
          shifted = (p - k + 26) % 26;
        } else {
          shifted = (p + k) % 26;
        }

        result += String.fromCharCode(shifted + base);
        keyIndex++;
      } else {
        result += char;
      }
    }

    return result;
  }

  encrypt(text: string, key: any): string {
    return this.process(text, String(key), false);
  }

  decrypt(text: string, key: any): string {
    return this.process(text, String(key), true);
  }

  analyze(text: string): SecurityAnalysis {
    return {
      algorithmName: 'Vigenère Cipher',
      securityLevel: 'LOW',
      estimatedKeySpace: '26^L (where L is keyword length)',
      attackResistance: 'LOW',
      recommendedUseCase: 'Learning polyalphabetic ciphers',
      modernRelevance: 'EDUCATIONAL ONLY'
    };
  }

  getMetadata() {
    return {
      name: 'Vigenère Cipher',
      category: 'Polyalphabetic Substitution',
      securityLevel: 'LOW',
      description: 'Uses a series of interwoven Caesar ciphers based on the letters of a keyword.',
      yearInvented: '1553',
      keySpace: 'Variable',
      modernUsage: 'Historical curiosity',
      recommendedUseCases: 'Educational'
    };
  }
}
