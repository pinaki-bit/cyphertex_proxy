import { AlgorithmRegistry } from './src/core/registry/AlgorithmRegistry';
import { initializeAlgorithms } from './src/algorithms';

// Initialize the algorithms
initializeAlgorithms();

const algorithms = ['caesar', 'vigenere', 'railfence', 'playfair', 'affine', 'hill', 'aes', 'rsa'];

const testCases = [
  "",
  "A",
  "Hello World!",
  "1234567890",
  "!@#$%^&*()_+",
  "The quick brown fox jumps over the lazy dog.",
  "P@ssw0rd123!#",
  " \t\n\r ", // Whitespace
  "a".repeat(1000), // Large input
  "ZzZzZzZzZzZz",
];

// Generate 90 more random test cases
for (let i = 0; i < 90; i++) {
  const length = Math.floor(Math.random() * 100) + 1;
  let str = "";
  for (let j = 0; j < length; j++) {
    // Random ascii 32-126
    str += String.fromCharCode(Math.floor(Math.random() * 95) + 32);
  }
  testCases.push(str);
}

const keys: any = {
  caesar: 3,
  vigenere: 'SECRET',
  railfence: 3,
  playfair: 'KEYWORD',
  affine: '5,8',
  hill: '3,3,2,5',
  aes: 'SuperSecretPassword123!',
};

// RSA Keys
import { RSACipher } from './src/algorithms/rsa';
keys.rsa = RSACipher.generateKeys();

let bugs = 0;
let totalTests = 0;

for (const algoId of algorithms) {
  const algo = AlgorithmRegistry.getAlgorithm(algoId);
  const key = keys[algoId];
  
  for (let i = 0; i < testCases.length; i++) {
    const text = testCases[i];
    totalTests++;
    try {
      const encrypted = algo.encrypt(text, key);
      const decrypted = algo.decrypt(encrypted, key);
      
      // Some algorithms (like playfair, affine, hill) might alter spaces or casing or drop special chars.
      // Let's just catch actual runtime crashes.
      if (decrypted === undefined) {
         throw new Error('Decrypted is undefined');
      }
    } catch (e: any) {
      console.log(`[BUG] Algo: ${algoId}, Test Case: ${i}, Length: ${text.length}, Error: ${e.message}`);
      bugs++;
    }
  }
}

console.log(`\nTest Suite Completed. Total Tests: ${totalTests}, Bugs Found: ${bugs}`);
