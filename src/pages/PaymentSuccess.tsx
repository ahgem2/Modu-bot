import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/auth';
import { CheckCircle, Home, ZapIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';

const PaymentSuccess = () => {
  const { user, setPremiumStatus } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    const verifyPayment = async () => {
      if (!sessionId) return;
      
      try {
        // Verify the payment with our Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { 
            sessionId,
            userId: user.id
          }
        });
        
        if (error) throw error;
        
        if (data.success) {
          // Update the user's premium status
          await setPremiumStatus(true);
          
          toast({
            title: "Payment successful!",
            description: "You've been upgraded to the Pro Plan.",
          });
        }
      } catch (error: any) {
        console.error('Payment verification error:', error);
        toast({
          title: "Payment verification failed",
          description: error.message || "There was a problem verifying your payment.",
          variant: "destructive",
        });
      }
    };
    
    verifyPayment();
  }, [user, sessionId, navigate, setPremiumStatus, toast]);

  return (
    <>
      <Helmet>
        <title>Payment Successful | ModuBot</title>
        <meta name="description" content="Your payment was successful. Thank you for subscribing to ModuBot Pro!" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                <CardDescription>
                  Thank you for subscribing to the ModuBot Pro Plan
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                <div className="p-4 mb-6 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-100 dark:border-green-800">
                  <p className="text-gray-600 dark:text-gray-300">
                    Your subscription is now active. You have full access to all Pro features!
                  </p>
                </div>
                
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-start gap-2">
                    <ZapIcon className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Unlimited AI questions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ZapIcon className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Advanced AI model access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ZapIcon className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Priority response time</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ZapIcon className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>File uploads & analysis</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center">
                <Button onClick={() => navigate('/dashboard')} className="gap-2">
                  <Home className="h-4 w-4" />
                  Go to Dashboard
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default PaymentSuccess;
