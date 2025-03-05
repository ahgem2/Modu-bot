
import { useState } from 'react';
import { ChatSession } from '@/types/chat';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Save, Folder } from 'lucide-react';

interface ChatSessionManagerProps {
  sessions: ChatSession[];
  activeSessionId?: string;
  onNewSession: () => void;
  onLoadSession: (sessionId: string) => void;
  onSaveSession: (name: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

const ChatSessionManager = ({
  sessions,
  activeSessionId,
  onNewSession,
  onLoadSession,
  onSaveSession,
  onDeleteSession
}: ChatSessionManagerProps) => {
  const [newSessionName, setNewSessionName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveSession = () => {
    if (newSessionName.trim()) {
      onSaveSession(newSessionName);
      setNewSessionName('');
      setIsOpen(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Folder className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chat Sessions</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="load" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="load">Load Session</TabsTrigger>
            <TabsTrigger value="save">Save Session</TabsTrigger>
          </TabsList>
          
          <TabsContent value="load" className="space-y-4 py-4">
            {sessions.length === 0 ? (
              <p className="text-center text-muted-foreground">No saved sessions found.</p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors flex justify-between items-center ${
                      session.id === activeSessionId ? 'border-primary' : 'border-border'
                    }`}
                    onClick={() => {
                      onLoadSession(session.id);
                      setIsOpen(false);
                    }}
                  >
                    <div>
                      <h4 className="font-medium">{session.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {formatDate(session.lastUpdatedAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this session?')) {
                          onDeleteSession(session.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={() => {
                onNewSession();
                setIsOpen(false);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Session
            </Button>
          </TabsContent>
          
          <TabsContent value="save" className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Session name"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button type="button" onClick={() => setIsOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSaveSession} 
            disabled={!newSessionName.trim()}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSessionManager;
