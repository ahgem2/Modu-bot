
import { Avatar } from '@/components/ui/avatar';
import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const ChatMessage = ({ message, isLoading = false }: ChatMessageProps) => {
  return (
    <div
      className={`chat-bubble ${message.role === 'user' ? 'user' : 'bot'} animate-fade-in`}
    >
      <div className="flex items-start">
        {message.role === 'assistant' && (
          <Avatar className="h-8 w-8 mr-3 bg-blue-500 text-white">
            <span>AI</span>
          </Avatar>
        )}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          ) : (
            <>
              <p className="whitespace-pre-line">{message.content}</p>
              <div className="text-xs opacity-50 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </>
          )}
        </div>
        {message.role === 'user' && (
          <Avatar className="h-8 w-8 ml-3 bg-gray-300 dark:bg-gray-600">
            <span>You</span>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
