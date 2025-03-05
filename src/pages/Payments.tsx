
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';

const Payments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: ''
  });

  if (!user) {
    navigate('/');
    return null;
  }

  const handleStartCheckout = async () => {
    setIsLoading(true);
    try {
      // Call the Stripe checkout function
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          priceId: 'price_1OtXXXXXXXXXXXXX', // This is a placeholder, you'll need to replace with your actual price ID
          userId: user.id, 
          userEmail: user.email,
          returnUrl: window.location.origin + '/payment-success'
        }
      });
      
      if (error) throw error;
      
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment initialization failed",
        description: error.message || "There was a problem setting up the payment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout | ModuBot</title>
        <meta name="description" content="Complete your purchase of the ModuBot Pro Plan." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6 pl-0" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Checkout</CardTitle>
                <CardDescription>
                  Complete your purchase to upgrade to the Pro Plan
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h3 className="font-semibold text-lg mb-2">Pro Plan</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Unlimited AI questions, advanced model access, priority response time and more
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">$15</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm font-medium">Secure Checkout with Stripe</span>
                  </div>
                  
                  <Button 
                    onClick={handleStartCheckout}
                    disabled={isLoading}
                    className="w-full py-6"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" /> 
                        Proceed to Payment
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  By proceeding, you agree to our Terms of Service and Privacy Policy.
                  Your subscription will automatically renew. You can cancel anytime.
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default Payments;
