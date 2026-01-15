export interface Citation {
  policyId: string;
  sectionId: string;
  text: string;
  pageNumber: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  timestamp: Date;
}
