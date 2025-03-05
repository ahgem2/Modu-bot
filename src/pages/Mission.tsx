
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Mission from '@/components/Mission';

const MissionPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Mission | ModuBot</title>
        <meta name="description" content="ModuBot's mission is to make communication and networking easier for everyone, whether for work, personal growth, or connecting with others." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Mission</h1>
            <Mission />
          </div>
        </main>
      </div>
    </>
  );
};

export default MissionPage;
