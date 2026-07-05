import { EncryptionAlgorithm } from '../interfaces/EncryptionAlgorithm';

export class AlgorithmRegistry {
  private static algorithms: Map<string, EncryptionAlgorithm> = new Map();

  static registerAlgorithm(id: string, algorithm: EncryptionAlgorithm): void {
    if (this.algorithms.has(id.toLowerCase())) {
      throw new Error(`Algorithm with id '${id}' is already registered.`);
    }
    this.algorithms.set(id.toLowerCase(), algorithm);
  }

  static getAlgorithm(id: string): EncryptionAlgorithm {
    const algo = this.algorithms.get(id.toLowerCase());
    if (!algo) {
      throw new Error(`Algorithm '${id}' not found in registry.`);
    }
    return algo;
  }

  static removeAlgorithm(id: string): void {
    this.algorithms.delete(id.toLowerCase());
  }

  static listAlgorithms(): Record<string, ReturnType<EncryptionAlgorithm['getMetadata']>> {
    const list: Record<string, ReturnType<EncryptionAlgorithm['getMetadata']>> = {};
    for (const [id, algo] of this.algorithms.entries()) {
      list[id] = algo.getMetadata();
    }
    return list;
  }
}
