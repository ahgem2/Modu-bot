
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import CreditCounter from '@/components/CreditCounter';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Settings, MessageSquare } from 'lucide-react';
import { BotPersonality } from '@/components/BotPersonalitySetup';
import { Layout } from '@/components/Layout';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('chat');
  
  // Redirect to home if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [isLoading, user, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <Layout>
      <Helmet>
        <title>Dashboard | QueryQuest</title>
        <meta name="description" content="Interact with our AI assistant and get answers to your questions." />
      </Helmet>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs 
          defaultValue="chat" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col-reverse md:flex-row gap-8">
            {/* Main Content - Chat Interface */}
            <div className="flex-1">
              <TabsContent value="chat" className="m-0">
                <ChatInterface />
              </TabsContent>
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-80">
              <div className="glass-card dark:glass-card-dark rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Your Credits</h2>
                  <CreditCounter />
                </div>
                
                {user?.credits === 0 && !user?.isPremium && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 dark:bg-amber-900/20 dark:border-amber-800">
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      You've used all your free credits. Upgrade to continue using QueryQuest.
                    </p>
                  </div>
                )}
                
                {!user?.isPremium && (
                  <Button 
                    onClick={() => navigate('/pricing')}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                )}
              </div>
              
              <div className="glass-card dark:glass-card-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Tips & Tricks</h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Customize your bot's personality using the settings icon.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Be specific in your questions for better answers.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Add your business domain to get more relevant responses.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Adjust your bot's tone to match your brand's voice.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Tabs>
      </main>
    </Layout>
  );
};

export default Dashboard;
