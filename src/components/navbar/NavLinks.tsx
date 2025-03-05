
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface NavLinksProps {
  links: NavLink[];
  className?: string;
}

export const NavLinks = ({ links, className }: NavLinksProps) => {
  const location = useLocation();
  
  // Add records link 
  const allLinks = [
    ...links,
    { href: "/records", label: "Records" }
  ];

  return (
    <div className={cn("flex items-center gap-1 md:gap-2", className)}>
      {allLinks.map(({ href, label, isExternal }) => {
        const isActive = location.pathname === href;
        
        return isExternal ? (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {label}
          </a>
        ) : (
          <Link
            key={href}
            to={href}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};
