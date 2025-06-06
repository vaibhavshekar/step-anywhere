import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import DestinationDetail from "./pages/DestinationDetail";
import DestinationsList from "./pages/DestinationsList";
import NotFound from "./pages/NotFound";
import FlightBooking from "./pages/FlightBooking";
import HotelBooking from "./pages/HotelBooking";
import ApiRestrictionPopup from "./components/ApiRestrictionPopup";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup on initial load
    setShowPopup(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <ApiRestrictionPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/destinations" element={<DestinationsList />} />
                <Route path="/destination/:id" element={<DestinationDetail />} />
                <Route
                  path="/flights"
                  element={
                    <ProtectedRoute>
                      <FlightBooking />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hotels"
                  element={
                    <ProtectedRoute>
                      <HotelBooking />
                    </ProtectedRoute>
                  }
                />
                <Route path="/safety-guide" element={<NotFound />} />
                <Route path="/badges" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
