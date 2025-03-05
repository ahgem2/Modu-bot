
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Infinity } from 'lucide-react';

// Add framer-motion dependency
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

interface CreditCounterProps {
  credits: number;
  isPremium: boolean;
}

const CreditCounter = ({ credits, isPremium }: CreditCounterProps) => {
  const [prevCredits, setPrevCredits] = useState(credits);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (credits !== prevCredits) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      setPrevCredits(credits);
      
      return () => clearTimeout(timer);
    }
  }, [credits, prevCredits]);

  const getCreditColor = () => {
    if (isPremium) return 'text-purple-500';
    if (credits <= 10) return 'text-red-500';
    if (credits <= 30) return 'text-amber-500';
    return 'text-blue-500';
  };

  return (
    <div 
      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border ${
        isPremium 
          ? 'border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-900/20' 
          : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
      }`}
    >
      {isPremium ? (
        <Infinity className="h-4 w-4 text-purple-500" />
      ) : (
        <Coins className={`h-4 w-4 ${getCreditColor()}`} />
      )}
      
      <div className="relative">
        <AnimatePresence>
          {isAnimating && (
            <motion.span
              key="old"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -20 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 font-medium text-sm ${getCreditColor()}`}
            >
              {prevCredits}
            </motion.span>
          )}
        </AnimatePresence>
        
        <motion.span
          key="current"
          initial={isAnimating ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-medium text-sm ${getCreditColor()}`}
        >
          {isPremium ? 'Unlimited' : credits}
        </motion.span>
      </div>
    </div>
  );
};

export default CreditCounter;
