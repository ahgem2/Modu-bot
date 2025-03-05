
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [demoMessages, setDemoMessages] = useState<Array<{text: string; sender: 'user' | 'bot'; typing?: boolean}>>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleTryNow = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthMode('signup');
      setShowAuthModal(true);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const imageVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }
    }
  };

  // Demo chat conversation - natural conversation about real estate business
  const conversationScript = [
    { text: "Hey there! How's your real estate business going these days?", sender: 'bot' as const },
    { text: "It's going great actually! I've been on a roll with my conversions lately and finally fixed up my workflow.", sender: 'user' as const },
    { text: "That's awesome to hear! What changes did you make to your workflow?", sender: 'bot' as const },
    { text: "Mostly automation. Still spending too much time on manual follow-ups though.", sender: 'user' as const },
    { text: "I might be able to help with that. Have you considered connecting your CRM to automation tools?", sender: 'bot' as const },
    { text: "I use GoHighLevel but haven't set up many integrations yet. Any recommendations?", sender: 'user' as const },
    { text: "Definitely! With your GoHighLevel setup, you could use PhantomBuster to auto-generate LinkedIn leads, or n8n for custom workflow automation.", sender: 'bot' as const },
    { text: "I'm actually spending a lot of time on LinkedIn messaging. Is there a way to streamline that?", sender: 'user' as const },
    { text: "You're in luck! I can work as a Chrome extension that integrates directly with LinkedIn messaging. Would help you engage prospects faster.", sender: 'bot' as const },
    { text: "That would be perfect! How difficult is it to set up?", sender: 'user' as const },
    { text: "Super simple! Just install the extension, connect it to your GoHighLevel account, and I'll help manage conversations across platforms. Want me to walk you through it?", sender: 'bot' as const },
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
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <motion.div 
        className="container px-4 mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="max-w-3xl mx-auto mb-8 space-y-4"
            variants={itemVariants}
          >
            <span className="inline-block px-4 py-2 mb-2 text-xs font-medium tracking-wider text-purple-700 uppercase bg-purple-100 rounded-full">
              Conversational AI Made Simple
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance text-black dark:text-white bg-clip-text">
              Your Personal AI Assistant
            </h1>
            <p className="mt-6 text-xl text-black dark:text-gray-200 text-balance font-medium">
              with Limitless Potential
            </p>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 text-balance">
              Experience the power of conversational AI with 100 free questions. Get instant answers, creative content, and intelligent assistance.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-6 mb-12"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              onClick={handleTryNow}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try Now - Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/pricing')}
              className="px-8 py-6 text-lg rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              View Pricing
            </Button>
          </motion.div>

          {/* Demo Chat Interface */}
          <motion.div 
            className="relative w-full max-w-5xl mt-12 rounded-xl overflow-hidden shadow-2xl"
            variants={imageVariants}
          >
            <div className="glass-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-4">
              <div className="bg-gradient-to-r from-purple-800/10 via-blue-700/10 to-green-600/10 rounded-t-lg p-3 border-b border-gray-200 dark:border-gray-700 flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-medium ml-2 text-gray-700 dark:text-gray-300">ModuBot AI Chat</span>
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

          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-purple-600">100+</span>
              <span className="text-sm text-gray-500">Free Credits</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-blue-500">24/7</span>
              <span className="text-sm text-gray-500">Availability</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-green-500">99%</span>
              <span className="text-sm text-gray-500">Accuracy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-purple-600">5M+</span>
              <span className="text-sm text-gray-500">Happy Users</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode={authMode}
      />
    </section>
  );
};

export default Hero;
