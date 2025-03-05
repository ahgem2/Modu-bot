
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth';

export interface NavLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  showExtraLinks?: boolean;
  links?: Array<{ label: string; href: string; isProtected?: boolean }>;
}

export const NavLinks = ({
  className,
  direction = 'row',
  showExtraLinks = true,
  ...props
}: NavLinksProps) => {
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        direction === 'column' && "flex-col items-start gap-2",
        className
      )}
      {...props}
    >
      <Link
        to="/features"
        className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
      >
        Features
      </Link>
      <Link
        to="/pricing"
        className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
      >
        Pricing
      </Link>
      <Link
        to="/mission"
        className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
      >
        Our Mission
      </Link>
      {user && (
        <>
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/team"
            className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
          >
            Team
          </Link>
          <Link
            to="/records"
            className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
          >
            Records
          </Link>
        </>
      )}
      {showExtraLinks && (
        <Link
          to="/cemented"
          className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
        >
          CementED
        </Link>
      )}
    </div>
  );
};
