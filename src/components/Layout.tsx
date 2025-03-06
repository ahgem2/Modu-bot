
import { ReactNode, memo } from 'react';
import Navbar from './Navbar';
import HomeNavBar from './HomeNavBar';

interface LayoutProps {
  children: ReactNode;
}

// Memoize the Layout component to prevent unnecessary re-renders
export const Layout = memo(({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HomeNavBar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
});

// Add display name for better debugging
Layout.displayName = 'Layout';
