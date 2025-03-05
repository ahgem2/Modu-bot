
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import PricingSection from '@/components/PricingSection';

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>Pricing | ModuBot</title>
        <meta name="description" content="Choose the perfect plan for your needs. Start with our free plan and upgrade when you're ready for more features." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h1>
            <PricingSection />
          </div>
        </main>
      </div>
    </>
  );
};

export default PricingPage;
