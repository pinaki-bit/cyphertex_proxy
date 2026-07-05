export interface EncryptionAlgorithm {
  encrypt(text: string, key: any): string;
  decrypt(text: string, key: any): string;
  getMetadata(): {
    name: string;
    category: string;
    securityLevel: string;
    description: string;
    yearInvented?: string;
    keySpace?: string;
    modernUsage?: string;
    recommendedUseCases?: string;
  };
}
