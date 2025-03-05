
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Handshake, Globe } from 'lucide-react';

const MissionPoint = ({ 
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-5"
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      </div>
    </motion.div>
  );
};

const Mission = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const missionPoints = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Facilitating Meaningful Conversations",
      description: "We're building tools that help people connect more authentically, transforming awkward interactions into productive conversations that create real value."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Supporting All Communication Styles",
      description: "Whether you're an introvert needing help to reach out or an extrovert looking to refine your approach, our platform meets you where you are and helps you grow."
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Enhancing Professional Networks",
      description: "As networking becomes increasingly essential in today's world, we provide a supportive framework that makes building professional relationships more accessible and less intimidating."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Creating Inclusive Communities",
      description: "We're committed to developing tools that bridge communication gaps and foster inclusive environments where diverse voices can connect and be heard."
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-wider text-purple-700 uppercase bg-purple-100 rounded-full">
            Our Purpose
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Making Human Connections Easier
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We believe that meaningful conversation is the foundation of personal growth, professional success, and community building. Our mission is to make connecting with others more accessible for everyone.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-8">
          {missionPoints.map((point, index) => (
            <MissionPoint 
              key={index}
              icon={point.icon}
              title={point.title}
              description={point.description}
              index={index}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg max-w-3xl mx-auto text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">For Everyone, Everywhere</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Whether you're using our platform for work, personal enrichment, or simply to make life a little easier, we're here to support your communication journey. From corporate teams to community groups to individuals seeking connection, our tools adapt to your unique needs and context.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
