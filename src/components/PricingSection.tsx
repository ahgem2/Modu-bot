
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

// Add framer-motion dependency
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

interface PlanFeature {
  title: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
}

const PricingSection = () => {
  const { user, setPremiumStatus } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const plans: PricingPlan[] = [
    {
      name: "Free",
      price: {
        monthly: 0,
        yearly: 0,
      },
      description: "Perfect for trying out our AI assistant.",
      features: [
        { title: "100 Credits", included: true },
        { title: "Basic Conversation", included: true },
        { title: "Personalized Responses", included: true },
        { title: "Chat History (7 days)", included: true },
        { title: "Priority Support", included: false },
        { title: "Advanced AI Models", included: false },
        { title: "API Access", included: false },
        { title: "Custom Integrations", included: false },
      ],
      buttonText: "Get Started"
    },
    {
      name: "Pro",
      price: {
        monthly: 19.99,
        yearly: 14.99,
      },
      description: "The perfect plan for professionals.",
      features: [
        { title: "Unlimited Credits", included: true },
        { title: "Advanced Conversation", included: true },
        { title: "Personalized Responses", included: true },
        { title: "Chat History (Unlimited)", included: true },
        { title: "Priority Support", included: true },
        { title: "Advanced AI Models", included: true },
        { title: "API Access", included: false },
        { title: "Custom Integrations", included: false },
      ],
      popular: true,
      buttonText: "Upgrade Now"
    },
    {
      name: "Enterprise",
      price: {
        monthly: 49.99,
        yearly: 39.99,
      },
      description: "For teams and organizations.",
      features: [
        { title: "Unlimited Credits", included: true },
        { title: "Advanced Conversation", included: true },
        { title: "Personalized Responses", included: true },
        { title: "Chat History (Unlimited)", included: true },
        { title: "Priority Support", included: true },
        { title: "Advanced AI Models", included: true },
        { title: "API Access", included: true },
        { title: "Custom Integrations", included: true },
      ],
      buttonText: "Contact Sales"
    }
  ];

  const handlePlanAction = (plan: PricingPlan) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Mock subscription process
    if (plan.name === "Free") {
      toast({
        title: "Already on Free Plan",
        description: "You're currently using the free plan with 100 credits.",
      });
      navigate('/dashboard');
    } else {
      // Mock successful subscription
      setTimeout(() => {
        setPremiumStatus(true);
        toast({
          title: `Subscribed to ${plan.name} Plan`,
          description: `You've successfully subscribed to the ${plan.name} plan.`,
        });
        navigate('/dashboard');
      }, 1000);
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-wider text-blue-700 uppercase bg-blue-100 rounded-full">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose the Perfect Plan for Your Needs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Start with 100 free credits. Upgrade anytime to unlock unlimited conversations.
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isYearly ? 'font-medium text-blue-600' : 'text-gray-500'}`}>Monthly</span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-sm ${isYearly ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
              Yearly <span className="text-xs text-green-600 font-medium">(Save 25%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-lg' 
                  : 'border border-gray-200 dark:border-gray-700'
              } bg-white dark:bg-gray-800`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-1">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                  <span className="text-sm font-normal text-gray-500">
                    /{isYearly ? 'yr' : 'mo'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mr-2 shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? '' : 'text-gray-500 dark:text-gray-400'}`}>
                      {feature.title}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handlePlanAction(plan)}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode="signup"
      />
    </section>
  );
};

export default PricingSection;
