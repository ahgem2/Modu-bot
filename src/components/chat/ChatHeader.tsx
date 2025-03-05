
import { Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import BotPersonalitySetup from '@/components/BotPersonalitySetup';
import { BotPersonality, ChatSession } from '@/types/chat';
import CreditCounter from '@/components/CreditCounter';
import ChatSessionManager from './ChatSessionManager';

interface ChatHeaderProps {
  botName: string;
  onClearChat: () => void;
  credits?: number;
  isPremium?: boolean;
  currentPersonality: BotPersonality;
  onPersonalityUpdate: (newPersonality: BotPersonality) => void;
  sessions: ChatSession[];
  activeSessionId?: string;
  onNewSession: () => void;
  onLoadSession: (sessionId: string) => void;
  onSaveSession: (name: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

const ChatHeader = ({ 
  botName, 
  onClearChat, 
  credits, 
  isPremium, 
  currentPersonality, 
  onPersonalityUpdate,
  sessions,
  activeSessionId,
  onNewSession,
  onLoadSession,
  onSaveSession,
  onDeleteSession
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 className="font-semibold text-lg">{botName}</h2>
      <div className="flex items-center space-x-2">
        {credits !== undefined && <CreditCounter credits={credits} isPremium={isPremium} />}
        
        <ChatSessionManager
          sessions={sessions}
          activeSessionId={activeSessionId}
          onNewSession={onNewSession}
          onLoadSession={onLoadSession}
          onSaveSession={onSaveSession}
          onDeleteSession={onDeleteSession}
        />
        
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
                currentPersonality={currentPersonality}
                onSave={onPersonalityUpdate}
              />
            </div>
          </SheetContent>
        </Sheet>

        <Button variant="ghost" size="icon" onClick={onClearChat}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
