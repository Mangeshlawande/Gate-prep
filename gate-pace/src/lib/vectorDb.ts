// Embedded High-Performance Vector Database for GATE Knowledge Retrieval
// Generates dense semantic embeddings and performs top-K cosine similarity search

export type DocumentCategory =
  | 'resource'
  | 'topic'
  | 'formula'
  | 'problem'
  | 'curriculum'
  | 'custom';

export interface VectorDocument {
  id: string;
  title: string;
  content: string;
  category: DocumentCategory;
  metadata: {
    subject?: string;
    url?: string;
    tags?: string[];
    importance?: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'Very High';
    expectedMarks?: number;
    trapWarning?: string;
    [key: string]: any;
  };
  vector: number[];
  createdAt: string;
}

export interface SearchResult {
  doc: VectorDocument;
  score: number;
}

export interface SearchOptions {
  topK?: number;
  minScore?: number;
  category?: DocumentCategory | 'all';
  subject?: string;
}

// 128-dimensional dense semantic feature hashing vectorizer
const VECTOR_DIMENSION = 128;

// Common English & academic stop words to downweight noise
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'else', 'when',
  'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from',
  'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
  'further', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
  'has', 'had', 'do', 'does', 'did', 'doing', 'it', 'its', 'this', 'that',
  'these', 'those', 'we', 'they', 'what', 'which', 'who', 'whom', 'why',
  'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'some',
  'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
  'very', 'can', 'will', 'just', 'should', 'now'
]);

/**
 * FNV-1a 32-bit string hashing
 */
function fnv1a(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Converts text into a 128-D L2-normalized semantic dense vector
 * Uses word tokenization, subword character 3-grams, and signed feature hashing
 */
export function embedText(text: string): number[] {
  const vec = new Float64Array(VECTOR_DIMENSION);
  if (!text || text.trim().length === 0) {
    return Array.from(vec);
  }

  const clean = text.toLowerCase().replace(/[^a-z0-9_\-\s]/g, ' ');
  const tokens = clean.split(/\s+/).filter((t) => t.length > 1);

  // 1. Word token unigrams & bigrams
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const weight = STOP_WORDS.has(token) ? 0.2 : 1.5;

    // Word hash
    const h1 = fnv1a(token);
    const index1 = (h1 >>> 1) % VECTOR_DIMENSION;
    const sign1 = (h1 & 1) === 0 ? 1 : -1;
    vec[index1] += sign1 * weight;

    // Bigram hash
    if (i < tokens.length - 1) {
      const nextToken = tokens[i + 1];
      const bigram = `${token}_${nextToken}`;
      const h2 = fnv1a(bigram);
      const index2 = (h2 >>> 1) % VECTOR_DIMENSION;
      const sign2 = (h2 & 1) === 0 ? 1 : -1;
      vec[index2] += sign2 * 2.0; // Higher weight for phrases
    }

    // Character 3-grams for morphological & acronym similarity
    if (token.length >= 3 && !STOP_WORDS.has(token)) {
      for (let j = 0; j <= token.length - 3; j++) {
        const tri = token.substring(j, j + 3);
        const h3 = fnv1a(tri);
        const index3 = (h3 >>> 1) % VECTOR_DIMENSION;
        const sign3 = (h3 & 1) === 0 ? 1 : -1;
        vec[index3] += sign3 * 0.4;
      }
    }
  }

  // 2. L2 Normalization (so dotProduct == cosine similarity)
  let normSq = 0;
  for (let i = 0; i < VECTOR_DIMENSION; i++) {
    normSq += vec[i] * vec[i];
  }

  if (normSq > 0) {
    const norm = Math.sqrt(normSq);
    for (let i = 0; i < VECTOR_DIMENSION; i++) {
      vec[i] /= norm;
    }
  }

  return Array.from(vec);
}

/**
 * Cosine similarity between two unit-normalized vectors
 */
export function cosineSimilarity(v1: number[], v2: number[]): number {
  if (!v1 || !v2 || v1.length !== v2.length) return 0;
  let dot = 0;
  for (let i = 0; i < v1.length; i++) {
    dot += v1[i] * v2[i];
  }
  return Math.max(-1, Math.min(1, dot));
}

export class VectorDatabase {
  private documents: Map<string, VectorDocument> = new Map();
  private storageKey: string;

  constructor(storageKey: string = 'gate_vector_db_v1') {
    this.storageKey = storageKey;
    this.loadFromStorage();
  }

  public insert(doc: Omit<VectorDocument, 'vector' | 'createdAt'> & { vector?: number[]; createdAt?: string }): VectorDocument {
    const vector = doc.vector && doc.vector.length === VECTOR_DIMENSION
      ? doc.vector
      : embedText(`${doc.title} ${doc.content} ${(doc.metadata.tags || []).join(' ')}`);

    const fullDoc: VectorDocument = {
      ...doc,
      vector,
      createdAt: doc.createdAt || new Date().toISOString()
    };

    this.documents.set(fullDoc.id, fullDoc);
    this.saveToStorage();
    return fullDoc;
  }

  public insertBatch(docs: Array<Omit<VectorDocument, 'vector' | 'createdAt'> & { vector?: number[]; createdAt?: string }>): void {
    for (const doc of docs) {
      const vector = doc.vector && doc.vector.length === VECTOR_DIMENSION
        ? doc.vector
        : embedText(`${doc.title} ${doc.content} ${(doc.metadata.tags || []).join(' ')}`);

      this.documents.set(doc.id, {
        ...doc,
        vector,
        createdAt: doc.createdAt || new Date().toISOString()
      });
    }
    this.saveToStorage();
  }

  public delete(id: string): boolean {
    const deleted = this.documents.delete(id);
    if (deleted) this.saveToStorage();
    return deleted;
  }

  public get(id: string): VectorDocument | undefined {
    return this.documents.get(id);
  }

  public getAll(): VectorDocument[] {
    return Array.from(this.documents.values());
  }

  public count(): number {
    return this.documents.size;
  }

  public search(query: string, options: SearchOptions = {}): SearchResult[] {
    const {
      topK = 5,
      minScore = 0.05,
      category = 'all',
      subject
    } = options;

    if (!query || query.trim().length === 0 || this.documents.size === 0) {
      return [];
    }

    const queryVec = embedText(query);
    const results: SearchResult[] = [];

    for (const doc of this.documents.values()) {
      // Category filter
      if (category !== 'all' && doc.category !== category) {
        continue;
      }

      // Subject filter
      if (subject && doc.metadata.subject && !doc.metadata.subject.toLowerCase().includes(subject.toLowerCase())) {
        continue;
      }

      const score = cosineSimilarity(queryVec, doc.vector);
      if (score >= minScore) {
        results.push({ doc, score });
      }
    }

    // Sort descending by score
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }

  public clear(): void {
    this.documents.clear();
    this.saveToStorage();
  }

  public exportState(): string {
    return JSON.stringify(Array.from(this.documents.values()), null, 2);
  }

  public importState(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr) as VectorDocument[];
      if (!Array.isArray(parsed)) return false;
      this.documents.clear();
      for (const item of parsed) {
        if (item.id && item.content) {
          this.documents.set(item.id, item);
        }
      }
      this.saveToStorage();
      return true;
    } catch {
      return false;
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const serialized = JSON.stringify(Array.from(this.documents.values()));
      localStorage.setItem(this.storageKey, serialized);
    } catch {
      // Ignore quota errors if storage is full
    }
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const item = localStorage.getItem(this.storageKey);
      if (item) {
        const parsed = JSON.parse(item) as VectorDocument[];
        if (Array.isArray(parsed)) {
          for (const doc of parsed) {
            this.documents.set(doc.id, doc);
          }
        }
      }
    } catch {
      // Fallback cleanly
    }
  }
}

// Global singleton instance
export const globalVectorDb = new VectorDatabase();
