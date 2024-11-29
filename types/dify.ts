// Types pour les requêtes
export interface DifyRequestMessage {
    query: string;
    conversation_id?: string;
    response_mode: 'streaming' | 'blocking';
    user: string;
    inputs?: Record<string, any>;
  }
  
  // Types pour les réponses
  export interface DifyResponseMessage {
    message_id: string;
    conversation_id: string;
    mode: string;
    answer: string;
    metadata: {
      usage: {
        total_tokens: number;
        prompt_tokens: number;
        completion_tokens: number;
      }
    }
    created_at: number;
  }
  
  // Types pour le streaming
  export interface DifyStreamChunk {
    event: 'message';
    task_id: string;
    message_id: string;
    conversation_id: string;
    answer: string;
    created_at: number;
  }