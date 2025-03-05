import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/auth';
import { useToast } from '@/components/ui/use-toast';
import { Message, BotPersonality, defaultPersonality, ChatSession } from '@/types/chat';
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

  // Initialize sessions
  useEffect(() => {
    if (!botPersonality.sessions) {
      const initialSession: ChatSession = {
        id: '1',
        name: 'Default Session',
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        messages: []
      };
      
      setBotPersonality(prev => ({
        ...prev,
        sessions: [initialSession],
        activeSessionId: initialSession.id
      }));
    }
  }, []);

  // Load active session messages
  useEffect(() => {
    if (botPersonality.sessions && botPersonality.activeSessionId) {
      const activeSession = botPersonality.sessions.find(s => s.id === botPersonality.activeSessionId);
      if (activeSession) {
        setMessages(activeSession.messages);
      }
    }
  }, [botPersonality.activeSessionId, botPersonality.sessions]);

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
    if (messages.length === 0 && botPersonality.sessions && botPersonality.activeSessionId) {
      const activeSession = botPersonality.sessions.find(s => s.id === botPersonality.activeSessionId);
      if (activeSession && activeSession.messages.length === 0) {
        const welcomeMessage = getWelcomeMessage(botPersonality);
        const welcomeMsg: Message = {
          id: '1',
          role: 'assistant',
          content: user ? welcomeMessage.replace('Hi there', `Hello${user.name ? ' ' + user.name : ''}`) : welcomeMessage,
          timestamp: new Date(),
          sessionId: botPersonality.activeSessionId
        };
        
        // Update both local messages and session messages
        setMessages([welcomeMsg]);
        updateSessionMessages(botPersonality.activeSessionId, [welcomeMsg]);
      }
    }
  }, [user, messages.length, botPersonality, botPersonality.activeSessionId, botPersonality.sessions]);

  const handleBotPersonalityUpdate = (newPersonality: BotPersonality) => {
    setBotPersonality(prev => ({
      ...newPersonality,
      sessions: prev.sessions,
      activeSessionId: prev.activeSessionId
    }));
    // Clear chat to show new welcome message for the current session
    if (botPersonality.activeSessionId) {
      updateSessionMessages(botPersonality.activeSessionId, []);
      setMessages([]);
    }
  };

  const updateSessionMessages = (sessionId: string, newMessages: Message[]) => {
    setBotPersonality(prev => {
      if (!prev.sessions) return prev;
      
      const updatedSessions = prev.sessions.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            messages: newMessages,
            lastUpdatedAt: new Date()
          };
        }
        return session;
      });
      
      return {
        ...prev,
        sessions: updatedSessions
      };
    });
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

    if (!botPersonality.activeSessionId) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      sessionId: botPersonality.activeSessionId
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    updateSessionMessages(botPersonality.activeSessionId, updatedMessages);
    
    setIsLoading(true);

    // Simulate AI thinking delay
    setTimeout(async () => {
      try {
        // Mock API call to get AI response
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: generateMockResponse(inputMessage, botPersonality),
          timestamp: new Date(),
          sessionId: botPersonality.activeSessionId
        };

        const finalMessages = [...updatedMessages, aiResponse];
        setMessages(finalMessages);
        updateSessionMessages(botPersonality.activeSessionId, finalMessages);
        
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
    if (botPersonality.activeSessionId) {
      setMessages([]);
      updateSessionMessages(botPersonality.activeSessionId, []);
    }
  };

  const handleNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: `Session ${botPersonality.sessions ? botPersonality.sessions.length + 1 : 1}`,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
      messages: []
    };

    setBotPersonality(prev => ({
      ...prev,
      sessions: [...(prev.sessions || []), newSession],
      activeSessionId: newSession.id
    }));

    setMessages([]);
  };

  const handleLoadSession = (sessionId: string) => {
    setBotPersonality(prev => ({
      ...prev,
      activeSessionId: sessionId
    }));
  };

  const handleSaveSession = (name: string) => {
    if (!botPersonality.activeSessionId) return;
    
    setBotPersonality(prev => {
      if (!prev.sessions) return prev;
      
      const updatedSessions = prev.sessions.map(session => {
        if (session.id === prev.activeSessionId) {
          return {
            ...session,
            name,
            lastUpdatedAt: new Date()
          };
        }
        return session;
      });
      
      return {
        ...prev,
        sessions: updatedSessions
      };
    });

    toast({
      title: "Session saved",
      description: `Chat session "${name}" has been saved.`
    });
  };

  const handleDeleteSession = (sessionId: string) => {
    setBotPersonality(prev => {
      if (!prev.sessions) return prev;
      
      // Filter out the deleted session
      const updatedSessions = prev.sessions.filter(session => session.id !== sessionId);
      
      // If we're deleting the active session, set a new active session
      let newActiveId = prev.activeSessionId;
      if (sessionId === prev.activeSessionId) {
        newActiveId = updatedSessions.length > 0 ? updatedSessions[0].id : undefined;
      }
      
      return {
        ...prev,
        sessions: updatedSessions,
        activeSessionId: newActiveId
      };
    });

    toast({
      title: "Session deleted",
      description: "Chat session has been deleted."
    });
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
    : 'ModuBot AI Assistant';

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <ChatHeader 
        botName={botName}
        onClearChat={clearChat}
        credits={user?.credits}
        isPremium={user?.isPremium}
        currentPersonality={botPersonality}
        onPersonalityUpdate={handleBotPersonalityUpdate}
        sessions={botPersonality.sessions || []}
        activeSessionId={botPersonality.activeSessionId}
        onNewSession={handleNewSession}
        onLoadSession={handleLoadSession}
        onSaveSession={handleSaveSession}
        onDeleteSession={handleDeleteSession}
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
