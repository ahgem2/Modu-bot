
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView, motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import AuthModal from './AuthModal';

const PricingSection = () => {
  const { user, setPremiumStatus } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAnnual, setIsAnnual] = useState(true);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const handlePricingClick = (isPremium: boolean) => {
    if (!user) {
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }
    
    if (isPremium) {
      // Simulate upgrading to premium
      setPremiumStatus(true);
      navigate('/dashboard');
    } else {
      // Free plan is already active by default
      navigate('/dashboard');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24">
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-wider text-blue-700 uppercase bg-blue-100 rounded-full">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose the Perfect Plan for You
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Start with our free plan and upgrade when you're ready for more.
          </p>

          <div className="flex items-center justify-center mt-6 space-x-4">
            <Label htmlFor="billing-toggle" className={!isAnnual ? "font-medium" : "text-gray-500"}>Monthly</Label>
            <Switch 
              id="billing-toggle" 
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing-toggle" className={isAnnual ? "font-medium" : "text-gray-500"}>
              Yearly <span className="text-green-600 text-xs font-bold">SAVE 20%</span>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div variants={itemVariants} className="glass-card dark:glass-card-dark rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for getting started</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-500 ml-2">/ forever</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">100 AI questions per account</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Basic response generation</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Standard response time</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => handlePricingClick(false)} 
              variant="outline" 
              className="w-full py-6"
            >
              {user ? 'Continue Free' : 'Get Started'}
            </Button>
          </motion.div>
          
          {/* Pro Plan */}
          <motion.div 
            variants={itemVariants} 
            className="glass-card dark:glass-card-dark rounded-2xl p-8 border-2 border-blue-500 dark:border-blue-400 relative shadow-lg"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Zap className="h-4 w-4" />
              MOST POPULAR
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">For power users who need more</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">${isAnnual ? '15' : '19'}</span>
              <span className="text-gray-500 ml-2">/ {isAnnual ? 'month' : 'month'}</span>
              {isAnnual && <p className="text-sm text-gray-500">Billed annually (${15 * 12})</p>}
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300"><strong>Unlimited</strong> AI questions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Advanced AI model access</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Priority response time</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">File uploads & analysis</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">API access for integrations</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => handlePricingClick(true)} 
              className="w-full py-6 bg-blue-600 hover:bg-blue-700"
            >
              {user && user.isPremium ? 'Manage Subscription' : 'Upgrade Now'}
            </Button>
          </motion.div>
        </div>

        <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
          <p>All plans include our standard features. Need a custom plan? <a href="#" className="text-blue-600 hover:underline">Contact us</a>.</p>
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

export default PricingSection;
