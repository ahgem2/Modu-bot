import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

type HeroActionsProps = {
  onTryNow: () => void;
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
  }
};

const HeroActions = ({ onTryNow }: HeroActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 mt-6 mb-12"
      variants={itemVariants}
    >
      <Button 
        size="lg" 
        onClick={onTryNow}
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
  );
};

export default HeroActions;
