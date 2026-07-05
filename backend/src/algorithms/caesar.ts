import { EncryptionAlgorithm, SecurityAnalysis } from '../core/interfaces/EncryptionAlgorithm';

export class CaesarCipher implements EncryptionAlgorithm {
  private shiftChar(char: string, shift: number): string {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const base = isUpperCase ? 65 : 97;
      
      let s = shift % 26;
      if (s < 0) s += 26;

      return String.fromCharCode(((code - base + s) % 26) + base);
    }
    return char;
  }

  encrypt(text: string, key: any): string {
    const shift = parseInt(key, 10);
    if (isNaN(shift)) throw new Error('Key must be a number for Caesar Cipher');
    return text.split('').map(c => this.shiftChar(c, shift)).join('');
  }

  decrypt(text: string, key: any): string {
    const shift = parseInt(key, 10);
    if (isNaN(shift)) throw new Error('Key must be a number for Caesar Cipher');
    return text.split('').map(c => this.shiftChar(c, -shift)).join('');
  }

  analyze(text: string): SecurityAnalysis {
    return {
      algorithmName: 'Caesar Cipher',
      securityLevel: 'LOW',
      estimatedKeySpace: '25 possible keys',
      attackResistance: 'VERY LOW',
      recommendedUseCase: 'Educational examples, simple puzzles',
      modernRelevance: 'EDUCATIONAL ONLY'
    };
  }

  getMetadata() {
    return {
      name: 'Caesar Cipher',
      category: 'Substitution',
      securityLevel: 'LOW',
      description: 'Named after Julius Caesar, this substitution cipher shifts each letter in the plaintext by a fixed number of positions down the alphabet.',
      yearInvented: '100 BC',
      keySpace: '25',
      modernUsage: 'ROT13 obfuscation',
      recommendedUseCases: 'Learning basic cryptography concepts'
    };
  }
}
