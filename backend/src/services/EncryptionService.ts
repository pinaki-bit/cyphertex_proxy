import { AlgorithmRegistry } from '../core/registry/AlgorithmRegistry';
import { prisma } from '../database';

export class EncryptionService {
  static async process(action: 'encrypt' | 'decrypt', algorithmId: string, text: string, key: any, userId?: string) {
    const start = performance.now();
    const algorithm = AlgorithmRegistry.getAlgorithm(algorithmId);
    
    let output: string;
    if (action === 'encrypt') {
      output = algorithm.encrypt(text, key);
    } else {
      output = algorithm.decrypt(text, key);
    }
    const processingTimeMs = performance.now() - start;

    const meta = algorithm.getMetadata();

    // Log History asynchronously to prevent blocking response
    setImmediate(async () => {
      try {
        await prisma.encryptionHistory.create({
          data: {
            userId: userId || null, // Mocking user for now if none provided
            algorithmId,
            action,
            inputLength: text.length,
            outputLength: output.length,
            processingTimeMs
          }
        });

        const usage = await prisma.algorithmUsage.upsert({
          where: { algorithmId },
          update: {
            totalEncryptions: action === 'encrypt' ? { increment: 1 } : undefined,
            totalDecryptions: action === 'decrypt' ? { increment: 1 } : undefined,
            lastUsedAt: new Date()
          },
          create: {
            algorithmId,
            totalEncryptions: action === 'encrypt' ? 1 : 0,
            totalDecryptions: action === 'decrypt' ? 1 : 0,
            avgProcessingTime: processingTimeMs,
          }
        });

      } catch (dbErr) {
        console.error('Database logging failed:', dbErr);
      }
    });

    return {
      success: true,
      algorithm: meta.name,
      input: text,
      output,
      securityLevel: meta.securityLevel,
      metadata: meta
    };
  }

  static getAlgorithmsMetadata() {
    return AlgorithmRegistry.listAlgorithms();
  }

  static async analyze(algorithmId: string, text: string, userId?: string) {
    const algorithm = AlgorithmRegistry.getAlgorithm(algorithmId);
    const analysis = algorithm.analyze(text);

    setImmediate(async () => {
      try {
        await prisma.securityAnalysisHistory.create({
          data: {
            algorithmId,
            inputLength: text.length,
            securityLevel: analysis.securityLevel
          }
        });
      } catch (err) {
        console.error('Analytics DB Log Error', err);
      }
    });

    return analysis;
  }
}
