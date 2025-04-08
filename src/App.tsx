
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NavbarWithTheme } from "./components/NavbarWithTheme";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import IndianRecipes from "./pages/IndianRecipes";
import NewRecipes from "./pages/NewRecipes";
import PopularRecipes from "./pages/PopularRecipes";
import RecipeDetail from "./pages/RecipeDetail";
import FoodVideos from "./pages/FoodVideos";
import SearchResults from "./pages/SearchResults";
import AddRecipe from "./pages/AddRecipe";
import Calculator from "./pages/Calculator";

// Create a query client without dependencies on backend
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    },
  },
});

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("App initializing...");
    
    // For now, we'll use localStorage for basic auth
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing stored user:", error);
    } finally {
      // Always finish loading after checking local storage
      setLoading(false);
    }
  }, []);

  // Function to handle login
  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };

  // If still loading, display a loading message
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <Router>
          <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
            <NavbarWithTheme user={user} onLogout={handleLogout} />
            <main className="flex-1 mt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/indian-recipes" element={<IndianRecipes />} />
                <Route path="/new-recipes" element={<NewRecipes />} />
                <Route path="/popular-recipes" element={<PopularRecipes />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/food-videos" element={<FoodVideos />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route
                  path="/add-recipe"
                  element={
                    <ProtectedRoute>
                      <AddRecipe user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" richColors closeButton />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
