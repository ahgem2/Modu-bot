
import { BotPersonality } from '@/types/chat';

export const domainSpecificWelcomeMessages: Record<string, string> = {
  'real-estate': "Hello! I'm your real estate assistant. I can help with property listings, market trends, buyer/seller advice, or connecting your CRM to automation tools. How can I assist your real estate business today?",
  'finance': "Hi there! I'm your finance assistant. I can help with financial planning, investment strategies, market analysis, or connecting your systems to automation tools. How can I assist your finance business today?",
  'healthcare': "Hello! I'm your healthcare assistant. I can help with appointment scheduling, patient information, insurance questions, or connecting your systems to automation tools. How can I assist your healthcare practice today?",
  'legal': "Hi there! I'm your legal assistant. I can help with case management, document preparation, legal research, or connecting your systems to automation tools. How can I assist your legal practice today?",
  'technology': "Hello! I'm your tech assistant. I can help with GoHighLevel integration, LinkedIn automation, PhantomBuster connections, or other technical workflows. How can I assist your tech business today?",
  'custom': "Hi there! I'm your custom assistant. I can help with your specific business needs, workflow automation, and connecting various tools. How can I assist your business today?"
};

export const getWelcomeMessage = (personality: BotPersonality): string => {
  const domainMessage = personality.domain === 'custom' && personality.customDomain
    ? `Hi there! I'm your ${personality.customDomain} assistant.`
    : domainSpecificWelcomeMessages[personality.domain] || domainSpecificWelcomeMessages.custom;
    
  if (personality.businessName) {
    return `${domainMessage.replace("I'm your", `I'm ${personality.businessName}'s`)} What can I help you with today?`;
  }
  
  return domainMessage;
};

export const generateMockResponse = (message: string, botPersonality: BotPersonality): string => {
  // Use bot personality to customize responses
  const domain = botPersonality.domain;
  const tone = botPersonality.tone;
  
  let responsePrefix = '';
  
  // Domain-specific language
  switch (domain) {
    case 'real-estate':
      responsePrefix = "Based on current market trends in real estate, ";
      break;
    case 'finance':
      responsePrefix = "From a financial perspective, ";
      break;
    case 'healthcare':
      responsePrefix = "In the healthcare field, ";
      break;
    case 'legal':
      responsePrefix = "From a legal standpoint, ";
      break;
    case 'technology':
      responsePrefix = "Looking at the tech integration options, ";
      break;
    case 'custom':
      responsePrefix = "For your specific business needs, ";
      break;
    default:
      responsePrefix = "Based on what you're asking, ";
  }
  
  // Tone adjustments
  let tonalAdjustment = '';
  switch (tone) {
    case 'casual':
      tonalAdjustment = "I think ";
      break;
    case 'professional':
      tonalAdjustment = "I would recommend ";
      break;
    case 'formal':
      tonalAdjustment = "I would suggest that ";
      break;
    case 'casual-professional':
      tonalAdjustment = "I'd recommend ";
      break;
    case 'enthusiastic':
      tonalAdjustment = "I'm excited to tell you that ";
      break;
    default:
      tonalAdjustment = "I suggest ";
  }
  
  const responses = [
    responsePrefix + tonalAdjustment + message.split(' ').slice(0, 3).join(' ') + " is something we can definitely help with. Let me provide some tailored information...",
    "That's a great question about " + (domain === 'real-estate' ? "property management" : "your business workflow") + "! " + tonalAdjustment + "we could approach this by...",
    responsePrefix + "I understand you're asking about " + message.split(' ').slice(0, 3).join(' ') + ". " + tonalAdjustment + "the best approach would be...",
    "Thanks for asking about that aspect of " + (domain === 'custom' && botPersonality.customDomain ? botPersonality.customDomain : domain) + ". " + tonalAdjustment + "we should focus on...",
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  const businessName = botPersonality.businessName ? ` with ${botPersonality.businessName}` : '';
  
  return randomResponse + "\n\nIs there anything else specific you'd like to know about integrating this" + businessName + "?";
};
