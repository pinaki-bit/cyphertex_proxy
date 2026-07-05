export interface SecurityAnalysis {
  algorithmName: string;
  securityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY HIGH';
  estimatedKeySpace: string;
  attackResistance: 'VERY LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREMELY HIGH';
  recommendedUseCase: string;
  modernRelevance: 'EDUCATIONAL ONLY' | 'LEGACY SYSTEM' | 'ENTERPRISE STANDARD';
}

export interface CipherMetadata {
  name: string;
  category: string;
  securityLevel: string;
  description: string;
  yearInvented?: string;
  keySpace?: string;
  modernUsage?: string;
  recommendedUseCases?: string;
}

export interface EncryptionAlgorithm {
  encrypt(text: string, key: any): string;
  decrypt(text: string, key: any): string;
  analyze(text: string): SecurityAnalysis;
  getMetadata(): CipherMetadata;
}
