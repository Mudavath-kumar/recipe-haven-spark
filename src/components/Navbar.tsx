
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Video, PlusCircle, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileSearch(false);
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

  // Navigation links for both desktop and mobile
  const navLinks = [
    { to: "/indian-recipes", label: "Indian Recipes" },
    { to: "/popular-recipes", label: "Popular" },
    { to: "/new-recipes", label: "New" },
    session ? { to: "/add-recipe", label: "Add Recipe", icon: <PlusCircle className="h-4 w-4 mr-2" /> } : null,
    { to: "/food-videos", label: "Videos", icon: <Video className="h-4 w-4 mr-2" /> },
  ].filter(Boolean);

  return (
    <nav className="border-b fixed top-0 left-0 right-0 bg-white z-10">
      <div className="container px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-semibold tracking-tight mr-6">
            RecipeHaven
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link, index) => (
              link && (
                <Link 
                  key={index}
                  to={link.to} 
                  className="text-sm font-medium hover:text-primary flex items-center"
                >
                  {link.icon}
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block md:w-64 lg:w-80">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Auth Buttons */}
          {!loading && (
            <>
              {session ? (
                <Button onClick={handleLogout} variant="ghost" className="hidden md:flex">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <div className="hidden md:flex items-center gap-2">
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
              )}
            </>
          )}
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link to="/" className="text-xl font-semibold">
                    RecipeHaven
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                
                <div className="space-y-4 flex-grow">
                  {navLinks.map((link, index) => (
                    link && (
                      <SheetClose key={index} asChild>
                        <Link
                          to={link.to}
                          className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md text-sm font-medium w-full"
                        >
                          {link.icon || <div className="w-4 h-4 mr-2" />}
                          {link.label}
                        </Link>
                      </SheetClose>
                    )
                  ))}
                </div>
                
                <div className="mt-auto pt-4 border-t">
                  {!loading && (
                    <>
                      {session ? (
                        <SheetClose asChild>
                          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                          </Button>
                        </SheetClose>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <SheetClose asChild>
                            <Button asChild variant="outline" className="w-full justify-start">
                              <Link to="/login">
                                <User className="mr-2 h-4 w-4" />
                                Login
                              </Link>
                            </Button>
                          </SheetClose>
                          
                          <SheetClose asChild>
                            <Button asChild className="w-full">
                              <Link to="/signup">Sign up</Link>
                            </Button>
                          </SheetClose>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="w-full px-4 py-2 bg-white md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="absolute right-1 top-1">
              Search
            </Button>
          </form>
        </div>
      )}
    </nav>
  );
};
