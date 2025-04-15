
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChefHat, Search, User, LogOut, LogIn, Plus, List, Calculator } from "lucide-react";
import { Session } from "@supabase/supabase-js";

interface NavbarWithThemeProps {
  session: Session | null;
}

export const NavbarWithTheme = ({ session }: NavbarWithThemeProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b transition-colors">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-recipe-700 dark:text-recipe-400" />
            <span className="font-playfair text-xl font-bold tracking-tight bg-gradient-to-r from-recipe-700 to-recipe-900 dark:from-recipe-400 dark:to-recipe-600 bg-clip-text text-transparent">
              CulinaryDelight
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/indian-recipes" className="text-sm font-medium hover:text-recipe-700 dark:hover:text-recipe-400 transition-colors">
              Indian
            </Link>
            <Link to="/popular-recipes" className="text-sm font-medium hover:text-recipe-700 dark:hover:text-recipe-400 transition-colors">
              Popular
            </Link>
            <Link to="/new-recipes" className="text-sm font-medium hover:text-recipe-700 dark:hover:text-recipe-400 transition-colors">
              New
            </Link>
            <Link to="/food-videos" className="text-sm font-medium hover:text-recipe-700 dark:hover:text-recipe-400 transition-colors">
              Videos
            </Link>
            <Link to="/calculator" className="text-sm font-medium hover:text-recipe-700 dark:hover:text-recipe-400 transition-colors">
              Calculator
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes..."
              className="w-[200px] lg:w-[300px] pl-8 bg-background rounded-full border-muted-foreground/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {session ? (
                <>
                  <DropdownMenuLabel>
                    <div className="break-words">
                      {session.user.email}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/add-recipe" className="flex items-center gap-2 cursor-pointer">
                      <Plus className="h-4 w-4" />
                      <span>Add Recipe</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-recipes" className="flex items-center gap-2 cursor-pointer">
                      <List className="h-4 w-4" />
                      <span>My Recipes</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/calculator" className="flex items-center gap-2 cursor-pointer">
                  <Calculator className="h-4 w-4" />
                  <span>Calculator</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
