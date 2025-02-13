
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Box, Video } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b">
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
          <Link to="/3d-food" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Box className="h-4 w-4" />
            3D Food
          </Link>
          <Link to="/food-videos" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Video className="h-4 w-4" />
            Videos
          </Link>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8"
            />
          </div>
          
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
