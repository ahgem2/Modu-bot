
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, CreditCard, Bell, Shield, LogOut } from 'lucide-react';

const Account = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Redirect to home if not logged in
  if (!isLoading && !user) {
    navigate('/');
    return null;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Account Settings | ModuBot</title>
        <meta name="description" content="Manage your ModuBot account settings and subscription." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Billing</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account details and personal information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Plan</CardTitle>
                    <CardDescription>
                      Manage your subscription and payment details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">
                          {user?.isPremium ? 'Pro Plan' : 'Free Plan'}
                        </h3>
                        {user?.isPremium && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {user?.isPremium 
                          ? 'You currently have unlimited access to all features.' 
                          : `You have ${user?.credits} credits remaining in your free plan.`}
                      </p>
                      <Button onClick={() => navigate('/pricing')}>
                        {user?.isPremium ? 'Manage Subscription' : 'Upgrade Now'}
                      </Button>
                    </div>
                    
                    {user?.isPremium && (
                      <div>
                        <h3 className="font-semibold mb-4">Payment Method</h3>
                        <div className="flex items-center justify-between p-3 border rounded-md mb-4">
                          <div className="flex items-center">
                            <div className="bg-gray-200 dark:bg-gray-700 h-8 w-12 rounded mr-3"></div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-xs text-gray-500">Expires 12/2025</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        <Button variant="outline" className="w-full">Add Payment Method</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Notification settings will be available soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>
                      Manage your privacy settings and account security.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Reset Password</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          Regularly update your password to keep your account secure.
                        </p>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Account Actions</h3>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                            onClick={handleLogout}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <footer className="bg-gray-100 dark:bg-gray-900 py-6">
          <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ModuBot. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Account;
