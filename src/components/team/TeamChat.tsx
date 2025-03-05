
import { useState, useRef, useEffect } from 'react';
import { Team } from '@/types/team';
import { User } from '@/context/auth/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Send, Loader2, Users, Zap } from 'lucide-react';
import { generateMockResponse } from '@/utils/chatUtils';

interface TeamChatProps {
  team: Team;
  currentUser: User;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
}

const TeamChat = ({ team, currentUser }: TeamChatProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);
  
  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `Welcome to the ${team.name} collaborative chat! Ask questions and share insights with your team.`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [team.name, messages.length]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Create user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      userId: currentUser.id,
      userName: currentUser.name || 'Anonymous'
    };
    
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      try {
        // Mock AI response
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: generateMockResponse(inputMessage, {
            businessName: team.name,
            domain: 'custom',
            tone: 'professional',
            audienceDescription: 'Team collaboration',
            keyProducts: 'AI assistant, collaboration tools',
            specialInstructions: `This is a shared chat for the ${team.name} team`
          }),
          timestamp: new Date()
        };
        
        setMessages([...updatedMessages, aiResponse]);
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
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <Card className="w-full">
        <CardHeader className="p-4 border-b">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <span>{team.name} Chat</span>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Zap className="h-4 w-4 mr-1 text-amber-500" />
              <span>{team.members.length} members</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[calc(70vh-12rem)]">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.role === 'user' && msg.userName && (
                        <div className="flex items-center justify-end mb-1 text-xs font-medium opacity-90">
                          {msg.userName}
                        </div>
                      )}
                      <div className="flex items-start">
                        {msg.role === 'assistant' && (
                          <Avatar className="h-8 w-8 mr-2">
                            <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-xs font-medium">
                              AI
                            </div>
                          </Avatar>
                        )}
                        <div className="flex-1">
                          <p className="whitespace-pre-line">{msg.content}</p>
                          <div className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                        {msg.role === 'user' && (
                          <Avatar className="h-8 w-8 ml-2">
                            <div className="flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-600 text-xs font-medium">
                              {msg.userName ? getInitials(msg.userName) : 'U'}
                            </div>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                      <div className="flex items-start">
                        <Avatar className="h-8 w-8 mr-2">
                          <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-xs font-medium">
                            AI
                          </div>
                        </Avatar>
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
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputMessage.trim() || isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {team.members.map(member => (
              <div key={member.id} className="flex items-center space-x-3">
                <Avatar>
                  <div className="flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-600 text-xs font-medium">
                    {getInitials(member.name)}
                  </div>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs text-gray-500">{member.role}</div>
                </div>
                {member.id === team.ownerId && (
                  <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full dark:bg-amber-900 dark:text-amber-100">
                    Owner
                  </span>
                )}
                {member.id === currentUser.id && member.id !== team.ownerId && (
                  <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-100">
                    You
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamChat;
