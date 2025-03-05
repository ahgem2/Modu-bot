
import React from 'react';

const MountainBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <div className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
           style={{
             backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80')`,
             filter: 'blur(2px)'
           }}
      />
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.9) 100%)',
          backdropFilter: 'blur(4px)'
        }}
      />
    </div>
  );
};

export default MountainBackground;
