import { AlgorithmRegistry } from '../core/registry/AlgorithmRegistry';
import { CaesarCipher } from './caesar';
import { VigenereCipher } from './vigenere';
import { RailFenceCipher } from './railfence';
import { PlayfairCipher } from './playfair';
import { AffineCipher } from './affine';
import { HillCipher } from './hill';
import { AESCipher } from './aes';
import { RSACipher } from './rsa';

export const initializeAlgorithms = () => {
  try {
    AlgorithmRegistry.registerAlgorithm('caesar', new CaesarCipher());
    AlgorithmRegistry.registerAlgorithm('vigenere', new VigenereCipher());
    AlgorithmRegistry.registerAlgorithm('railfence', new RailFenceCipher());
    AlgorithmRegistry.registerAlgorithm('playfair', new PlayfairCipher());
    AlgorithmRegistry.registerAlgorithm('affine', new AffineCipher());
    AlgorithmRegistry.registerAlgorithm('hill', new HillCipher());
    AlgorithmRegistry.registerAlgorithm('aes', new AESCipher());
    AlgorithmRegistry.registerAlgorithm('rsa', new RSACipher());
    console.log('All cryptographic algorithms registered successfully.');
  } catch (error) {
    console.error('Failed to register algorithms:', error);
  }
};
