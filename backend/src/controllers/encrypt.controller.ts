import { Request, Response } from 'express';
import { EncryptionService } from '../services/EncryptionService';

export const encrypt = async (req: Request, res: Response) => {
  try {
    const { algorithm, text, key } = req.body;
    
    if (!algorithm || text === undefined || key === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required parameters: algorithm, text, key' });
    }

    const result = await EncryptionService.process('encrypt', algorithm, text, key);
    res.json(result);
  } catch (error: any) {
    console.error('Encryption error:', error.message);
    res.status(400).json({ success: false, error: error.message || 'Encryption processing failed' });
  }
};

export const decrypt = async (req: Request, res: Response) => {
  try {
    const { algorithm, text, key } = req.body;
    
    if (!algorithm || text === undefined || key === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required parameters: algorithm, text, key' });
    }

    const result = await EncryptionService.process('decrypt', algorithm, text, key);
    res.json(result);
  } catch (error: any) {
    console.error('Decryption error:', error.message);
    res.status(400).json({ success: false, error: error.message || 'Decryption processing failed' });
  }
};

export const analyze = async (req: Request, res: Response) => {
  try {
    const { algorithm, text } = req.body;
    if (!algorithm || !text) {
      return res.status(400).json({ success: false, error: 'Missing algorithm or text' });
    }
    const analysis = await EncryptionService.analyze(algorithm, text);
    res.json({ success: true, analysis });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Analysis failed' });
  }
};

export const getAlgorithms = async (req: Request, res: Response) => {
  try {
    const metadata = EncryptionService.getAlgorithmsMetadata();
    res.json({ success: true, algorithms: metadata });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve algorithms metadata' });
  }
};

export const generateKeys = async (req: Request, res: Response) => {
  try {
    const { algorithm } = req.body;
    if (algorithm === 'rsa') {
      const { RSACipher } = await import('../algorithms/rsa');
      const crypto = await import('crypto');
      const keys = RSACipher.generateKeys();
      
      const fingerprint = crypto.createHash('sha256').update(keys.publicKey).digest('hex').substring(0, 32).match(/.{1,4}/g)?.join(':') || '';
      
      return res.json({ 
        success: true, 
        keys,
        metadata: {
          keySize: '2048-bit',
          fingerprint: fingerprint.toUpperCase(),
          generationTime: new Date().toISOString()
        }
      });
    }
    return res.status(400).json({ success: false, error: 'Key generation not supported for this algorithm' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Key generation failed' });
  }
};
