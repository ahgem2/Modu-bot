
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface BotPersonality {
  businessName: string;
  domain: string;
  customDomain?: string;
  tone: string;
  audienceDescription: string;
  keyProducts: string;
  specialInstructions: string;
}

export const defaultPersonality: BotPersonality = {
  businessName: 'QueryQuest',
  domain: 'technology',
  tone: 'casual-professional',
  audienceDescription: 'Business professionals looking to improve their workflows',
  keyProducts: 'AI assistant, LinkedIn automation, GoHighLevel integration',
  specialInstructions: 'Maintain a helpful and casual tone while staying professional'
};
