import { EncryptionAlgorithm, SecurityAnalysis } from '../core/interfaces/EncryptionAlgorithm';

export class HillCipher implements EncryptionAlgorithm {
  private mod(n: number, m: number): number {
    return ((n % m) + m) % m;
  }

  private modInverse(a: number, m: number): number {
    for (let i = 1; i < m; i++) {
      if (this.mod(a * i, m) === 1) {
        return i;
      }
    }
    throw new Error(`Matrix is not invertible mod 26 (determinant has no inverse)`);
  }

  private parseKey(key: any): number[][] {
    let k: number[] = [];
    if (typeof key === 'string') {
      k = key.split(',').map(n => parseInt(n.trim(), 10));
    } else if (Array.isArray(key)) {
      k = key.map(n => parseInt(n, 10));
    } else {
      throw new Error('Invalid key format for Hill Cipher. Expecting an array of 4 numbers.');
    }

    if (k.length !== 4 || k.some(isNaN)) {
      throw new Error('Hill cipher requires a 2x2 matrix (4 numbers).');
    }

    return [
      [k[0], k[1]],
      [k[2], k[3]]
    ];
  }

  private invertMatrix(matrix: number[][]): number[][] {
    const det = this.mod(matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0], 26);
    if (det === 0) throw new Error('Matrix determinant is 0, cannot invert.');
    if (det % 2 === 0 || det % 13 === 0) throw new Error('Matrix determinant is not coprime with 26.');

    const detInv = this.modInverse(det, 26);

    const adjugate = [
      [matrix[1][1], -matrix[0][1]],
      [-matrix[1][0], matrix[0][0]]
    ];

    return [
      [this.mod(adjugate[0][0] * detInv, 26), this.mod(adjugate[0][1] * detInv, 26)],
      [this.mod(adjugate[1][0] * detInv, 26), this.mod(adjugate[1][1] * detInv, 26)]
    ];
  }

  private process(text: string, matrix: number[][]): string {
    const chars: { char: string, isUpper: boolean, idx: number }[] = [];
    
    for (let i = 0; i < text.length; i++) {
      if (text[i].match(/[a-z]/i)) {
        chars.push({
          char: text[i],
          isUpper: text[i] === text[i].toUpperCase(),
          idx: i
        });
      }
    }

    if (chars.length % 2 !== 0) {
      chars.push({
        char: 'X',
        isUpper: true,
        idx: text.length
      });
    }

    const resultChars = [...text.split('')];
    if (chars.length > 0 && chars[chars.length - 1].idx === text.length) {
      resultChars.push(''); 
    }

    for (let i = 0; i < chars.length; i += 2) {
      const c1 = chars[i];
      const c2 = chars[i+1];

      const v1 = c1.char.toUpperCase().charCodeAt(0) - 65;
      const v2 = c2.char.toUpperCase().charCodeAt(0) - 65;

      const e1 = this.mod(matrix[0][0] * v1 + matrix[0][1] * v2, 26);
      const e2 = this.mod(matrix[1][0] * v1 + matrix[1][1] * v2, 26);

      resultChars[c1.idx] = String.fromCharCode(e1 + (c1.isUpper ? 65 : 97));
      resultChars[c2.idx] = String.fromCharCode(e2 + (c2.isUpper ? 65 : 97));
    }

    return resultChars.join('');
  }

  encrypt(text: string, key: any): string {
    const matrix = this.parseKey(key);
    return this.process(text, matrix);
  }

  decrypt(text: string, key: any): string {
    const matrix = this.parseKey(key);
    const inverse = this.invertMatrix(matrix);
    return this.process(text, inverse);
  }

  analyze(text: string): SecurityAnalysis {
    return {
      algorithmName: 'Hill Cipher',
      securityLevel: 'MEDIUM',
      estimatedKeySpace: '157,248 keys (mod 26)',
      attackResistance: 'LOW',
      recommendedUseCase: 'Linear algebra concepts',
      modernRelevance: 'EDUCATIONAL ONLY'
    };
  }

  getMetadata() {
    return {
      name: 'Hill Cipher',
      category: 'Polygraphic Substitution',
      securityLevel: 'MEDIUM',
      description: 'A polygraphic substitution cipher based on linear algebra. Each block of n letters is multiplied by an invertible n x n matrix, against modulo 26.',
      yearInvented: '1929',
      keySpace: '157,248 possible 2x2 keys mod 26',
      modernUsage: 'None, vulnerable to known-plaintext attacks',
      recommendedUseCases: 'Learning about linear algebra in cryptography'
    };
  }
}
