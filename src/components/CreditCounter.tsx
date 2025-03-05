
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const CreditCounter = () => {
  const { user } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Trigger animation when credits change
  useEffect(() => {
    if (user) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [user?.credits]);

  if (!user) return null;

  return (
    <div className="relative flex items-center gap-2 p-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold">
        AI
      </div>
      <AnimatePresence mode="wait">
        <motion.div 
          key={user.credits}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`font-medium text-sm ${isAnimating ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
        >
          {user.credits} Credits
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CreditCounter;
