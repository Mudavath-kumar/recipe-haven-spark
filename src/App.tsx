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
import { connectToMongoDB } from "./integrations/mongodb/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // Don't refetch on window focus
      refetchOnWindowFocus: false
    },
  },
});

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize MongoDB connection
    const initMongoDB = async () => {
      try {
        console.log("Connecting to MongoDB...");
        await connectToMongoDB();
        console.log("MongoDB connection successful");
        
        // You would implement your auth check here
        // For now, we'll just set loading to false
        setLoading(false);
      } catch (error) {
        console.error("Error initializing MongoDB:", error);
        setError("Failed to connect to the database. Please try again later.");
        setLoading(false);
      }
    };

    initMongoDB();

    // For now, we'll use localStorage for basic auth
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (!loading) setLoading(false);
    } catch (error) {
      console.error("Error parsing stored user:", error);
      setLoading(false);
    }
  }, []);

  // Function to handle login (to be passed to Login component)
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

  // If there's an error, display it
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reload Application
        </button>
      </div>
    );
  }

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
