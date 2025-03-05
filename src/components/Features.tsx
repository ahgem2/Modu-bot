import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { MessageSquare, Code, Zap, Repeat, BarChart4, Lock } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description,
  index
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card dark:glass-card-dark rounded-2xl p-6 transition-all duration-300 hover:shadow-xl"
    >
      <div className="inline-flex p-3 mb-4 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Natural Conversations",
      description: "Engage in fluid, natural conversations that feel human-like and responsive."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Smart Code Assistance",
      description: "Get help with coding, debugging, and technical questions across various languages."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Responses",
      description: "Receive immediate answers and assistance without lengthy waiting times."
    },
    {
      icon: <Repeat className="h-6 w-6" />,
      title: "Continuous Learning",
      description: "Our AI improves with each interaction, providing increasingly relevant responses."
    },
    {
      icon: <BarChart4 className="h-6 w-6" />,
      title: "Usage Analytics",
      description: "Track your question history and monitor your credit usage with detailed insights."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Private & Secure",
      description: "Your conversations are private and secure with enterprise-grade encryption."
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-wider text-blue-700 uppercase bg-blue-100 rounded-full">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need in One Assistant
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover how our AI assistant can transform your productivity and simplify your daily tasks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
