
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { SonnerToaster } from "@/components/ui/index";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import NetworkStatus from "./components/NetworkStatus";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Payments from "./pages/Payments";
import PaymentSuccess from "./pages/PaymentSuccess";
import Features from "./pages/Features";
import Mission from "./pages/Mission";
import Pricing from "./pages/Pricing";
import CementED from "./pages/CementED";
import Records from "./pages/Records";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";

// Create the QueryClient outside the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Define the App component
function App() {
  console.log("App rendering");
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HelmetProvider>
            <ErrorBoundary>
              <TooltipProvider>
                <Toaster />
                <SonnerToaster />
                <NetworkStatus />
                <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/mission" element={<Mission />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/cemented" element={<CementED />} />
                    <Route path="/records" element={<Records />} />
                    <Route path="/team" element={<Team />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </TooltipProvider>
            </ErrorBoundary>
          </HelmetProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
