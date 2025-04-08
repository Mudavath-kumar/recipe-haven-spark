
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChefHat, Search, User, LogOut, LogIn } from "lucide-react";

interface NavbarWithThemeProps {
  user: any;
  onLogout: () => void;
}

export const NavbarWithTheme = ({ user, onLogout }: NavbarWithThemeProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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
              <DropdownMenuItem asChild>
                <Link to="/add-recipe" className="flex items-center gap-2 cursor-pointer">
                  <ChefHat className="h-4 w-4" />
                  <span>Add Recipe</span>
                </Link>
              </DropdownMenuItem>
              {!user ? (
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
