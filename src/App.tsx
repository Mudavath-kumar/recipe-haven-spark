
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
import { supabase } from "./integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { preloadCommonRecipeImages } from "./lib/imageUtils";
import MyRecipes from "./pages/MyRecipes";
import EditRecipe from "./pages/EditRecipe";

const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload common images to improve initial loading experience
    preloadCommonRecipeImages();
    
    // Check for active session
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!session) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <Router>
          <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
            <NavbarWithTheme session={session} />
            <main className="flex-1 mt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
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
                      <AddRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-recipes"
                  element={
                    <ProtectedRoute>
                      <MyRecipes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-recipe/:id"
                  element={
                    <ProtectedRoute>
                      <EditRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" richColors />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
