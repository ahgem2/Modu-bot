
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/auth"; 
import Background3D from "./components/Background3D";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Payments from "./pages/Payments";
import PaymentSuccess from "./pages/PaymentSuccess";
import Features from "./pages/Features";
import Mission from "./pages/Mission";
import Pricing from "./pages/Pricing";
import CementED from "./pages/CementED";
import NotFound from "./pages/NotFound";

// Create the QueryClient outside the component
const queryClient = new QueryClient();

// Define the App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Background3D />
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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
