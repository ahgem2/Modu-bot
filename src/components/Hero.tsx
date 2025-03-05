
import { useState } from 'react';
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-green-400">
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

          <motion.div 
            className="relative w-full max-w-5xl mt-12 rounded-xl overflow-hidden shadow-2xl"
            variants={imageVariants}
          >
            <div className="glass-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img 
                src="https://placehold.co/1200x800/e6e6fa/4b0082?text=ModuBot+AI+Assistant"
                alt="ModuBot AI Assistant Interface" 
                className="w-full h-auto"
                loading="lazy"
              />
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
