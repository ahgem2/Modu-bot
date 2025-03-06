
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, initialMode }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  console.log("AuthModal rendered");

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Auth form submitted:", mode, email);

    try {
      // Simplified for now
      setTimeout(() => {
        toast({
          title: mode === 'login' ? "Logged in successfully" : "Account created",
          description: mode === 'login' ? "Welcome back to ModuBot!" : "Welcome to ModuBot! You've been given 100 credits to start.",
        });
        handleClose();
      }, 1000);
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: mode === 'login' ? "Login failed" : "Signup failed",
        description: "Please check your details and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-semibold">
          {mode === 'login' ? 'Log in to your account' : 'Create an account'}
        </DialogTitle>
        <DialogDescription className="text-gray-500 dark:text-gray-400">
          {mode === 'login' 
            ? 'Enter your email below to log in to your account.' 
            : 'Fill in the information below to create your account.'}
        </DialogDescription>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'login' ? 'Logging in...' : 'Signing up...'}
              </>
            ) : (
              mode === 'login' ? 'Log in' : 'Sign up'
            )}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-1 text-blue-600 hover:underline focus:outline-none"
              disabled={isLoading}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
