
import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/auth';
import { useToast } from '@/components/ui/use-toast';
import { Message, BotPersonality, defaultPersonality } from '@/types/chat';
import { getWelcomeMessage, generateMockResponse } from '@/utils/chatUtils';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import ChatHeader from '@/components/chat/ChatHeader';

const ChatInterface = () => {
  const { user, updateCredits } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [botPersonality, setBotPersonality] = useState<BotPersonality>(
    JSON.parse(localStorage.getItem('botPersonality') || 'null') || defaultPersonality
  );
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

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

  const handleSendMessage = async (inputMessage: string) => {
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
    setIsLoading(true);

    // Simulate AI thinking delay
    setTimeout(async () => {
      try {
        // Mock API call to get AI response
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: generateMockResponse(inputMessage, botPersonality),
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

  const clearChat = () => {
    setMessages([]);
  };

  // Determine if the chat input should be disabled
  const isChatDisabled = !user || (user.credits <= 0 && !user.isPremium);
  const disabledMessage = !user 
    ? "Please sign in to start chatting" 
    : (user.credits === 0 && !user.isPremium)
      ? "You've used all your credits. Please upgrade to continue."
      : undefined;

  const botName = botPersonality.businessName 
    ? `${botPersonality.businessName} AI Assistant` 
    : 'QueryQuest AI Assistant';

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <ChatHeader 
        botName={botName}
        onClearChat={clearChat}
        credits={user?.credits}
        isPremium={user?.isPremium}
        currentPersonality={botPersonality}
        onPersonalityUpdate={handleBotPersonalityUpdate}
      />

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          
          {isLoading && (
            <ChatMessage 
              message={{
                id: 'loading',
                role: 'assistant',
                content: '',
                timestamp: new Date()
              }}
              isLoading={true}
            />
          )}
        </div>
      </ScrollArea>

      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        isDisabled={isChatDisabled}
        disabledMessage={disabledMessage}
      />
    </div>
  );
};

export default ChatInterface;
