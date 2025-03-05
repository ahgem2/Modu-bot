
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CreditCounterProps {
  credits?: number;
  isPremium?: boolean;
}

const CreditCounter = ({ credits, isPremium }: CreditCounterProps = {}) => {
  const { user } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use passed credits or get from user context
  const displayCredits = credits !== undefined ? credits : user?.credits;
  
  // Trigger animation when credits change
  useEffect(() => {
    if (displayCredits !== undefined) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [displayCredits]);

  if (displayCredits === undefined && !user) return null;

  return (
    <div className="relative flex items-center gap-2 p-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold">
        AI
      </div>
      <AnimatePresence mode="wait">
        <motion.div 
          key={displayCredits}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`font-medium text-sm ${isAnimating ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
        >
          {displayCredits} Credits
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CreditCounter;
