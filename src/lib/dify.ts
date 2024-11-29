// lib/dify.ts
export interface DifyConfig {
    apiKey: string;
    baseUrl: string;
  }
  
  export const difyConfig: DifyConfig = {
    apiKey: process.env.DIFY_API_KEY!,
    baseUrl: process.env.DIFY_API_URL!
  }