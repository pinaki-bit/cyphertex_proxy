import { EncryptionAlgorithm, SecurityAnalysis } from '../core/interfaces/EncryptionAlgorithm';

export class RailFenceCipher implements EncryptionAlgorithm {
  encrypt(text: string, key: any): string {
    const numRails = parseInt(key, 10);
    if (isNaN(numRails) || numRails < 2) throw new Error('Key must be a number >= 2 for Rail Fence Cipher');
    if (text.length <= numRails) return text;

    const rails: string[][] = Array.from({ length: numRails }, () => []);
    let dirDown = false;
    let row = 0;

    for (let i = 0; i < text.length; i++) {
      rails[row].push(text[i]);
      if (row === 0 || row === numRails - 1) {
        dirDown = !dirDown;
      }
      row += dirDown ? 1 : -1;
    }

    return rails.map(r => r.join('')).join('');
  }

  decrypt(text: string, key: any): string {
    const numRails = parseInt(key, 10);
    if (isNaN(numRails) || numRails < 2) throw new Error('Key must be a number >= 2 for Rail Fence Cipher');
    if (text.length <= numRails) return text;

    const rails: string[][] = Array.from({ length: numRails }, () => Array(text.length).fill('\n'));
    let dirDown = false;
    let row = 0;

    for (let i = 0; i < text.length; i++) {
      rails[row][i] = '*';
      if (row === 0 || row === numRails - 1) {
        dirDown = !dirDown;
      }
      row += dirDown ? 1 : -1;
    }

    let index = 0;
    for (let i = 0; i < numRails; i++) {
      for (let j = 0; j < text.length; j++) {
        if (rails[i][j] === '*' && index < text.length) {
          rails[i][j] = text[index++];
        }
      }
    }

    let result = '';
    row = 0;
    dirDown = false;
    for (let i = 0; i < text.length; i++) {
      result += rails[row][i];
      if (row === 0 || row === numRails - 1) {
        dirDown = !dirDown;
      }
      row += dirDown ? 1 : -1;
    }

    return result;
  }

  analyze(text: string): SecurityAnalysis {
    return {
      algorithmName: 'Rail Fence Cipher',
      securityLevel: 'LOW',
      estimatedKeySpace: 'Number of characters in plaintext',
      attackResistance: 'VERY LOW',
      recommendedUseCase: 'Transposition cipher basics',
      modernRelevance: 'EDUCATIONAL ONLY'
    };
  }

  getMetadata() {
    return {
      name: 'Rail Fence Cipher',
      category: 'Transposition',
      securityLevel: 'LOW',
      description: 'A transposition cipher that writes text downwards and diagonally on successive "rails" of an imaginary fence.',
      yearInvented: 'Antiquity',
      keySpace: 'Variable',
      modernUsage: 'None',
      recommendedUseCases: 'Learning about transposition'
    };
  }
}
