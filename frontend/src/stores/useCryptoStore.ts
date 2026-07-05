import { create } from 'zustand';

interface CryptoState {
  algorithmId: string;
  mode: 'encrypt' | 'decrypt';
  inputText: string;
  outputText: string;
  keys: Record<string, any>;
  rsaMetadata: {
    keySize: string;
    fingerprint: string;
    generationTime: string;
  } | null;
  metadata: Record<string, any>;
  analysis: any;
  loading: boolean;
  error: string;
  setAlgorithmId: (id: string) => void;
  setMode: (mode: 'encrypt' | 'decrypt') => void;
  setInputText: (text: string) => void;
  setOutputText: (text: string) => void;
  setKey: (algoId: string, key: any) => void;
  setRsaMetadata: (meta: any) => void;
  setMetadata: (metadata: Record<string, any>) => void;
  setAnalysis: (analysis: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  algorithmId: 'aes',
  mode: 'encrypt',
  inputText: '',
  outputText: '',
  keys: {
    caesar: 3,
    vigenere: 'SECRET',
    railfence: 3,
    playfair: 'KEYWORD',
    affine: '5,8',
    hill: '3,3,2,5',
    aes: 'SuperSecretPassword123!',
    rsa: ''
  },
  rsaMetadata: null,
  metadata: {},
  analysis: null,
  loading: false,
  error: '',

  setAlgorithmId: (id) => set({ algorithmId: id, error: '', outputText: '' }),
  setMode: (mode) => set({ mode }),
  setInputText: (inputText) => set({ inputText }),
  setOutputText: (outputText) => set({ outputText }),
  setKey: (algoId, key) => set((state) => ({ keys: { ...state.keys, [algoId]: key } })),
  setRsaMetadata: (rsaMetadata) => set({ rsaMetadata }),
  setMetadata: (metadata) => set({ metadata }),
  setAnalysis: (analysis) => set({ analysis }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, outputText: '' }),
}));
