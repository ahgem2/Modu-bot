
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
  }
};

const HeroHeader = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto mb-8 space-y-4"
      variants={itemVariants}
    >
      <span className="inline-block px-4 py-2 mb-2 text-xs font-medium tracking-wider text-purple-700 uppercase bg-purple-100 rounded-full">
        Conversational AI Made Simple
      </span>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance text-white bg-clip-text">
        Talking, Done Simply.
      </h1>
      <p className="mt-6 text-xl text-black dark:text-gray-200 text-balance font-medium">
        Your Personal AI Assistant with Limitless Potential
      </p>
      <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 text-balance">
        Experience the power of conversational AI with 100 free questions. Get instant answers, creative content, and intelligent assistance.
      </p>
    </motion.div>
  );
};

export default HeroHeader;
