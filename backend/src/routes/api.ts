import { Router } from 'express';
import { encrypt, decrypt, getAlgorithms, analyze, generateKeys } from '../controllers/encrypt.controller';

const router = Router();

router.post('/encrypt', encrypt);
router.post('/decrypt', decrypt);
router.post('/analyze', analyze);
router.post('/generate-keys', generateKeys);
router.get('/algorithms', getAlgorithms);
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'CryptoForge X API is running.' });
});

export default router;
