
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          RecipeHaven
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="relative w-96">
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
