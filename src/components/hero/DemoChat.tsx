
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Message = {
  text: string;
  sender: 'user' | 'bot';
  typing?: boolean;
};

const imageVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }
  }
};

const DemoChat = () => {
  const [demoMessages, setDemoMessages] = useState<Array<Message>>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Demo chat conversation - natural conversation about real estate business
  const conversationScript = [
    { text: "Hey there! How's your real estate business going these days?", sender: 'user' as const },
    { text: "It's going great actually! I've been on a roll with my conversions lately and finally fixed up my workflow.", sender: 'bot' as const },
    { text: "That's awesome to hear! What kind of workflow improvements have you made?", sender: 'user' as const },
    { text: "Mostly automation. Still spending too much time on manual follow-ups though.", sender: 'bot' as const },
    { text: "I might be able to help with that. Have you considered connecting your CRM to automation tools?", sender: 'user' as const },
    { text: "I use GoHighLevel but haven't set up many integrations yet. Any recommendations?", sender: 'bot' as const },
    { text: "Definitely! With your GoHighLevel setup, you could use PhantomBuster to auto-generate LinkedIn leads, or n8n for custom workflow automation.", sender: 'user' as const },
    { text: "I'm actually spending a lot of time on LinkedIn messaging. Is there a way to streamline that?", sender: 'bot' as const },
    { text: "You're in luck! I can work as a Chrome extension that integrates directly with LinkedIn messaging. Would help you engage prospects faster.", sender: 'user' as const },
    { text: "That would be perfect! How difficult is it to set up?", sender: 'bot' as const },
    { text: "Super simple! Just install the extension, connect it to your GoHighLevel account, and I'll help manage conversations across platforms. Want me to walk you through it?", sender: 'user' as const },
  ];

  // Animate the conversation
  useEffect(() => {
    if (currentMessageIndex < conversationScript.length) {
      const typingDelay = conversationScript[currentMessageIndex].sender === 'bot' ? 1000 : 500;
      
      // First show typing indicator
      if (conversationScript[currentMessageIndex].sender === 'bot') {
        setDemoMessages(prev => [...prev, { text: '', sender: 'bot', typing: true }]);
      }
      
      // Then after delay, show the message
      const timer = setTimeout(() => {
        setDemoMessages(prev => {
          // Remove typing indicator if it exists
          const newMessages = prev.filter(msg => !msg.typing);
          return [...newMessages, conversationScript[currentMessageIndex]];
        });
        setCurrentMessageIndex(prevIndex => prevIndex + 1);
      }, typingDelay);
      
      return () => clearTimeout(timer);
    } else if (currentMessageIndex === conversationScript.length) {
      // Reset the conversation after completion with a longer delay
      const resetTimer = setTimeout(() => {
        setDemoMessages([]);
        setCurrentMessageIndex(0);
      }, 5000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex]);

  return (
    <motion.div 
      className="relative w-full max-w-5xl mt-12 rounded-xl overflow-hidden shadow-2xl"
      variants={imageVariants}
    >
      <div className="glass-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-4">
        <div className="bg-gradient-to-r from-purple-800/10 via-blue-700/10 to-green-600/10 rounded-t-lg p-3 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm font-medium ml-2 text-gray-700 dark:text-gray-300">Talking, Done Simply</span>
        </div>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 h-[400px] overflow-y-auto flex flex-col space-y-4">
          <div className="flex justify-center my-4">
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 px-3 py-1 rounded-full">Today, 10:24 AM</span>
          </div>
          
          {/* Welcome message */}
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold">AI</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg rounded-tl-none p-3 max-w-[80%] text-left">
              <p className="text-gray-800 dark:text-gray-200">Hi there! I'm ModuBot. I can integrate with GoHighLevel, PhantomBuster, LinkedIn, and work as a Chrome extension to enhance your business workflow. How can I help today?</p>
            </div>
          </div>
          
          {/* Dynamic messages */}
          {demoMessages.map((message, index) => (
            <div key={index} className={`flex items-start mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold">AI</div>
                </div>
              )}
              <div className={`${message.sender === 'user' 
                ? 'bg-purple-600 text-white rounded-lg rounded-tr-none' 
                : 'bg-gray-100 dark:bg-gray-700 rounded-lg rounded-tl-none'} 
                p-3 max-w-[80%] text-left ${message.typing ? 'animate-pulse' : ''}`}>
                {message.typing ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                ) : (
                  <p className={`${message.sender === 'user' ? 'text-white' : 'text-gray-800 dark:text-gray-200'} whitespace-pre-line`}>
                    {message.text}
                  </p>
                )}
              </div>
              {message.sender === 'user' && (
                <div className="flex-shrink-0 ml-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs font-bold">You</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 rounded-b-lg">
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              disabled
            />
            <button className="ml-3 p-2 rounded-full bg-purple-600 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoChat;
