import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

const caesarCipher = (text: string, shift: number, decrypt = false): string => {
  // Normalize shift to positive 0-25
  let s = shift % 26;
  if (s < 0) s += 26;
  
  if (decrypt) {
    s = (26 - s) % 26;
  }

  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const base = isUpperCase ? 65 : 97;
      return String.fromCharCode(((code - base + s) % 26) + base);
    }
    return char;
  }).join('');
};

export const encrypt = async (req: Request, res: Response) => {
  try {
    const { text, shift } = req.body;
    
    if (typeof text !== 'string' || typeof shift !== 'number') {
      return res.status(400).json({ error: 'Invalid input format. Expected text: string, shift: number' });
    }

    const ciphertext = caesarCipher(text, shift);
    
    // TODO: log analytics using Prisma when database is ready

    res.json({ plaintext: text, ciphertext });
  } catch (error) {
    console.error('Encryption error:', error);
    res.status(500).json({ error: 'Encryption processing failed' });
  }
};

export const decrypt = async (req: Request, res: Response) => {
  try {
    const { text, shift } = req.body;
    
    if (typeof text !== 'string' || typeof shift !== 'number') {
      return res.status(400).json({ error: 'Invalid input format. Expected text: string, shift: number' });
    }

    const plaintext = caesarCipher(text, shift, true);

    // TODO: log analytics using Prisma when database is ready

    res.json({ ciphertext: text, plaintext });
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).json({ error: 'Decryption processing failed' });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Mock analytics for now
    res.json({
      totalEncryptions: 1250,
      totalDecryptions: 834,
      popularShiftKeys: [3, 7, 13],
      characterFrequencies: { 'e': 12.7, 't': 9.0, 'a': 8.1 }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve analytics' });
  }
};
