
import { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/auth';
import { useToast } from '@/components/ui/use-toast';
import CreditCounter from './CreditCounter';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const { user, updateCredits } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `Hello${user ? ' ' + user.name : ''}! I'm your AI assistant. I can help with GoHighLevel integration, LinkedIn automation via Chrome extension, or connect with tools like PhantomBuster and n8n. How can I assist your business today?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [user, messages.length]);

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

  // Mock response generator
  const generateMockResponse = (message: string): string => {
    const responses = [
      "I understand you're asking about " + message.split(' ').slice(0, 3).join(' ') + ". Let me provide some helpful information...",
      "That's an interesting question about your business workflow! Based on my knowledge, I would suggest...",
      "I'm glad you asked about that integration. Here's what I know about connecting these platforms...",
      "Let me analyze your LinkedIn automation needs. The most important factors to consider are...",
      "Thanks for your question about GoHighLevel. I've processed your request and here's what I found...",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse + "\n\nI can also help integrate this with your Chrome extension for LinkedIn if that would be useful. Is there anything else you'd like to know?";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-lg">QueryQuest AI Assistant</h2>
        <div className="flex items-center space-x-2">
          {user && <CreditCounter credits={user.credits} isPremium={user.isPremium} />}
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
