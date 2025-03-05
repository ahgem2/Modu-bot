
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
  }
};

const StatsSection = () => {
  return (
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
  );
};

export default StatsSection;
