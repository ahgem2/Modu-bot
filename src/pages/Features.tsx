
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';

const FeaturesPage = () => {
  return (
    <>
      <Helmet>
        <title>Features | ModuBot</title>
        <meta name="description" content="Explore the features of ModuBot, the intelligent chatbot platform." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Features</h1>
            <Features />
          </div>
        </main>
      </div>
    </>
  );
};

export default FeaturesPage;
