
import { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Loader2, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/auth';
import { useToast } from '@/components/ui/use-toast';
import CreditCounter from './CreditCounter';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import BotPersonalitySetup, { BotPersonality } from './BotPersonalitySetup';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const defaultPersonality: BotPersonality = {
  businessName: 'QueryQuest',
  domain: 'technology',
  tone: 'casual-professional',
  audienceDescription: 'Business professionals looking to improve their workflows',
  keyProducts: 'AI assistant, LinkedIn automation, GoHighLevel integration',
  specialInstructions: 'Maintain a helpful and casual tone while staying professional'
};

const domainSpecificWelcomeMessages: Record<string, string> = {
  'real-estate': "Hello! I'm your real estate assistant. I can help with property listings, market trends, buyer/seller advice, or connecting your CRM to automation tools. How can I assist your real estate business today?",
  'finance': "Hi there! I'm your finance assistant. I can help with financial planning, investment strategies, market analysis, or connecting your systems to automation tools. How can I assist your finance business today?",
  'healthcare': "Hello! I'm your healthcare assistant. I can help with appointment scheduling, patient information, insurance questions, or connecting your systems to automation tools. How can I assist your healthcare practice today?",
  'legal': "Hi there! I'm your legal assistant. I can help with case management, document preparation, legal research, or connecting your systems to automation tools. How can I assist your legal practice today?",
  'technology': "Hello! I'm your tech assistant. I can help with GoHighLevel integration, LinkedIn automation, PhantomBuster connections, or other technical workflows. How can I assist your tech business today?",
  'custom': "Hi there! I'm your custom assistant. I can help with your specific business needs, workflow automation, and connecting various tools. How can I assist your business today?"
};

const getWelcomeMessage = (personality: BotPersonality): string => {
  const domainMessage = personality.domain === 'custom' && personality.customDomain
    ? `Hi there! I'm your ${personality.customDomain} assistant.`
    : domainSpecificWelcomeMessages[personality.domain] || domainSpecificWelcomeMessages.custom;
    
  if (personality.businessName) {
    return `${domainMessage.replace("I'm your", `I'm ${personality.businessName}'s`)} What can I help you with today?`;
  }
  
  return domainMessage;
};

const ChatInterface = () => {
  const { user, updateCredits } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [botPersonality, setBotPersonality] = useState<BotPersonality>(
    JSON.parse(localStorage.getItem('botPersonality') || 'null') || defaultPersonality
  );
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  // Focus input on initial load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Save bot personality to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('botPersonality', JSON.stringify(botPersonality));
  }, [botPersonality]);

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = getWelcomeMessage(botPersonality);
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: user ? welcomeMessage.replace('Hi there', `Hello${user.name ? ' ' + user.name : ''}`) : welcomeMessage,
          timestamp: new Date()
        }
      ]);
    }
  }, [user, messages.length, botPersonality]);

  const handleBotPersonalityUpdate = (newPersonality: BotPersonality) => {
    setBotPersonality(newPersonality);
    // Clear chat to show new welcome message
    setMessages([]);
  };

  const generateMockResponse = (message: string): string => {
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use the chat interface.",
        variant: "destructive",
      });
      return;
    }

    // Check if user has credits
    if (user.credits <= 0 && !user.isPremium) {
      toast({
        title: "Out of credits",
        description: "You've used all your credits. Upgrade to continue using the assistant.",
        variant: "destructive",
      });
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI thinking delay
    setTimeout(async () => {
      try {
        // Mock API call to get AI response
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: generateMockResponse(inputMessage),
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiResponse]);
        
        // Decrease credit count if not premium
        if (!user.isPremium) {
          updateCredits(user.credits - 1);
        }
      } catch (error) {
        console.error('Error getting AI response:', error);
        toast({
          title: "Error",
          description: "Failed to get response from AI. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-lg">
          {botPersonality.businessName ? `${botPersonality.businessName} AI Assistant` : 'QueryQuest AI Assistant'}
        </h2>
        <div className="flex items-center space-x-2">
          {user && <CreditCounter credits={user.credits} isPremium={user.isPremium} />}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Settings className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Bot Personality Settings</SheetTitle>
                <SheetDescription>
                  Customize your AI assistant to match your business domain and communication style
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <BotPersonalitySetup 
                  currentPersonality={botPersonality}
                  onSave={handleBotPersonalityUpdate}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="icon" onClick={clearChat}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${msg.role === 'user' ? 'user' : 'bot'} animate-fade-in`}
            >
              <div className="flex items-start">
                {msg.role === 'assistant' && (
                  <Avatar className="h-8 w-8 mr-3 bg-blue-500 text-white">
                    <span>AI</span>
                  </Avatar>
                )}
                <div className="flex-1">
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <div className="text-xs opacity-50 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {msg.role === 'user' && (
                  <Avatar className="h-8 w-8 ml-3 bg-gray-300 dark:bg-gray-600">
                    <span>You</span>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-bubble bot animate-fade-in">
              <div className="flex items-start">
                <Avatar className="h-8 w-8 mr-3 bg-blue-500 text-white">
                  <span>AI</span>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading || (user?.credits === 0 && !user?.isPremium)}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim() || isLoading || (user?.credits === 0 && !user?.isPremium)}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        {!user && (
          <p className="text-sm text-center mt-2 text-red-500">Please sign in to start chatting</p>
        )}
        {user && user.credits === 0 && !user.isPremium && (
          <p className="text-sm text-center mt-2 text-amber-500">
            You've used all your credits. Please upgrade to continue.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
