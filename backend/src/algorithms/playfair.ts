import { EncryptionAlgorithm, SecurityAnalysis } from '../core/interfaces/EncryptionAlgorithm';

export class PlayfairCipher implements EncryptionAlgorithm {
  private generateMatrix(key: string): string[] {
    const matrix: string[] = [];
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    const keyString = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    
    const used = new Set<string>();

    for (const char of keyString) {
      if (!used.has(char)) {
        matrix.push(char);
        used.add(char);
      }
    }

    for (const char of alphabet) {
      if (!used.has(char)) {
        matrix.push(char);
        used.add(char);
      }
    }

    return matrix;
  }

  private process(text: string, key: string, decrypt: boolean): string {
    const matrix = this.generateMatrix(key);
    
    let preparedText = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let digraphs: string[] = [];
    
    if (!decrypt) {
      for (let i = 0; i < preparedText.length; i += 2) {
        let pair = preparedText.substring(i, i + 2);
        if (pair.length === 2 && pair[0] === pair[1]) {
          pair = pair[0] + 'X';
          i--;
        } else if (pair.length === 1) {
          pair += 'X';
        }
        digraphs.push(pair);
      }
    } else {
      for (let i = 0; i < preparedText.length; i += 2) {
        digraphs.push(preparedText.substring(i, i + 2));
      }
    }

    let result = '';
    const shift = decrypt ? -1 : 1;

    for (const pair of digraphs) {
      const idx1 = matrix.indexOf(pair[0]);
      const idx2 = matrix.indexOf(pair[1]);

      const r1 = Math.floor(idx1 / 5), c1 = idx1 % 5;
      const r2 = Math.floor(idx2 / 5), c2 = idx2 % 5;

      if (r1 === r2) {
        result += matrix[r1 * 5 + (c1 + shift + 5) % 5];
        result += matrix[r2 * 5 + (c2 + shift + 5) % 5];
      } else if (c1 === c2) {
        result += matrix[((r1 + shift + 5) % 5) * 5 + c1];
        result += matrix[((r2 + shift + 5) % 5) * 5 + c2];
      } else {
        result += matrix[r1 * 5 + c2];
        result += matrix[r2 * 5 + c1];
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
      algorithmName: 'Playfair Cipher',
      securityLevel: 'LOW',
      estimatedKeySpace: '25!',
      attackResistance: 'LOW',
      recommendedUseCase: 'Digraphic substitution study',
      modernRelevance: 'EDUCATIONAL ONLY'
    };
  }

  getMetadata() {
    return {
      name: 'Playfair Cipher',
      category: 'Digraphic Substitution',
      securityLevel: 'LOW',
      description: 'Encrypts pairs of letters (digraphs) instead of single letters using a 5x5 key matrix. I and J are typically merged.',
      yearInvented: '1854',
      keySpace: '1.55 x 10^25',
      modernUsage: 'Used in WWII, broken',
      recommendedUseCases: 'Learning about digraphs'
    };
  }
}
