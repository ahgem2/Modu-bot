
import { ReactNode, memo } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

// Memoize the Layout component to prevent unnecessary re-renders
export const Layout = memo(({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
});

// Add display name for better debugging
Layout.displayName = 'Layout';
