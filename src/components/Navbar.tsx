
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Video, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="border-b fixed top-0 left-0 right-0 bg-white z-10">
      <div className="container flex flex-col py-4 md:h-16 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          RecipeHaven
        </Link>
        
        <div className="mt-4 flex flex-wrap items-center gap-4 md:mt-0">
          <Link to="/indian-recipes" className="text-sm font-medium hover:text-primary">
            Indian Recipes
          </Link>
          <Link to="/popular-recipes" className="text-sm font-medium hover:text-primary">
            Popular
          </Link>
          <Link to="/new-recipes" className="text-sm font-medium hover:text-primary">
            New
          </Link>
          <Link to="/add-recipe" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Recipe
          </Link>
          <Link to="/food-videos" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Video className="h-4 w-4" />
            Videos
          </Link>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Button asChild variant="ghost">
            <Link to="/login">
              <User className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
