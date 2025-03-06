
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

interface AuthButtonsProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
}

const AuthButtons = ({ onLoginClick, onSignupClick, onLogoutClick }: AuthButtonsProps) => {
  let user = null;
  
  try {
    const auth = useAuth();
    user = auth.user;
    console.log("AuthButtons rendered successfully, user:", user);
  } catch (error) {
    console.error("Error in AuthButtons when using auth:", error);
  }
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      {user ? (
        <Button variant="ghost" onClick={onLogoutClick} className="btn-hover">
          Log out
        </Button>
      ) : (
        <>
          <Button variant="ghost" onClick={onLoginClick} className="btn-hover">
            Log in
          </Button>
          <Button onClick={onSignupClick} className="btn-hover">
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
