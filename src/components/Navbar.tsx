import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, User, Video, PlusCircle, LogOut, Menu, X, 
  ChefHat, Heart, Award, Clock, Coffee, Utensils, Pizza, 
  BookOpen, TrendingUp, Calendar
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        return null;
      }
    }
    return null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileSearch(false);
    } else {
      toast.error("Please enter a search term");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const cuisineCategories = [
    { to: "/popular-recipes?category=indian", label: "Indian", icon: <ChefHat className="h-4 w-4 mr-2 text-amber-500" /> },
    { to: "/popular-recipes?category=italian", label: "Italian", icon: <Pizza className="h-4 w-4 mr-2 text-red-500" /> },
    { to: "/popular-recipes?category=asian", label: "Asian", icon: <Utensils className="h-4 w-4 mr-2 text-emerald-500" /> },
    { to: "/popular-recipes?category=middle-eastern", label: "Middle Eastern", icon: <Coffee className="h-4 w-4 mr-2 text-amber-600" /> },
    { to: "/popular-recipes?category=french", label: "French", icon: <ChefHat className="h-4 w-4 mr-2 text-blue-500" /> },
  ];

  const dietaryCategories = [
    { to: "/popular-recipes?filter=vegetarian", label: "Vegetarian", icon: <Heart className="h-4 w-4 mr-2 text-green-500" /> },
    { to: "/popular-recipes?filter=non-vegetarian", label: "Non-Vegetarian", icon: <Utensils className="h-4 w-4 mr-2 text-red-500" /> },
    { to: "/popular-recipes?filter=dessert", label: "Desserts & Sweets", icon: <Coffee className="h-4 w-4 mr-2 text-pink-500" /> },
  ];

  const exploreCategories = [
    { to: "/popular-recipes", label: "Popular", icon: <Award className="h-4 w-4 mr-2 text-amber-500" /> },
    { to: "/new-recipes", label: "New", icon: <Calendar className="h-4 w-4 mr-2 text-blue-500" /> },
    { to: "/food-videos", label: "Videos", icon: <Video className="h-4 w-4 mr-2 text-purple-500" /> },
    user ? { to: "/add-recipe", label: "Add Recipe", icon: <PlusCircle className="h-4 w-4 mr-2 text-green-500" /> } : null,
  ].filter(Boolean);

  return (
    <nav className="border-b fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
      <div className="container px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-semibold tracking-tight mr-6 bg-gradient-to-r from-recipe-700 to-recipe-900 text-transparent bg-clip-text">
            RecipeHaven
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-slate-100 transition-colors">
                  Cuisines
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Explore Cuisines</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cuisineCategories.map((item, idx) => (
                  <DropdownMenuItem key={idx} asChild>
                    <Link to={item.to} className="flex items-center cursor-pointer w-full">
                      {item.icon}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-slate-100 transition-colors">
                  Dietary
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Dietary Preferences</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dietaryCategories.map((item, idx) => (
                  <DropdownMenuItem key={idx} asChild>
                    <Link to={item.to} className="flex items-center cursor-pointer w-full">
                      {item.icon}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-slate-100 transition-colors">
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Discover More</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {exploreCategories.map((item, idx) => (
                  item && (
                    <DropdownMenuItem key={idx} asChild>
                      <Link to={item.to} className="flex items-center cursor-pointer w-full">
                        {item.icon}
                        {item.label}
                        {item.label === "New" && (
                          <Badge className="ml-2 bg-green-500 hover:bg-green-600" variant="secondary">New</Badge>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  )
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/indian-recipes" className="relative group">
              <Button variant="ghost" className="hover:bg-slate-100 transition-colors flex items-center">
                <ChefHat className="mr-2 h-4 w-4 text-amber-500" />
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-medium">
                  Indian Recipes
                </span>
                <Badge className="ml-2 bg-amber-500 hover:bg-amber-600" variant="secondary">Hot</Badge>
              </Button>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative hidden md:block md:w-64 lg:w-80">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8 rounded-full border-gray-300 focus:border-recipe-500 focus:ring focus:ring-recipe-200 focus:ring-opacity-50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full h-8 w-8 p-0 overflow-hidden border">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer w-full">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/add-recipe" className="flex items-center cursor-pointer w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Recipe
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-red-500 hover:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button asChild variant="ghost" className="hover:bg-slate-100">
                    <Link to="/login">
                      <User className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  
                  <Button asChild className="bg-recipe-700 hover:bg-recipe-800">
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link to="/" className="text-xl font-semibold bg-gradient-to-r from-recipe-700 to-recipe-900 text-transparent bg-clip-text">
                    RecipeHaven
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                
                <div className="space-y-1 flex-grow">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Cuisines</div>
                  {cuisineCategories.map((item, idx) => (
                    <SheetClose key={`cuisine-${idx}`} asChild>
                      <Link
                        to={item.to}
                        className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md text-sm font-medium w-full"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="mt-4 px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Dietary</div>
                  {dietaryCategories.map((item, idx) => (
                    <SheetClose key={`dietary-${idx}`} asChild>
                      <Link
                        to={item.to}
                        className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md text-sm font-medium w-full"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="mt-4 px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Explore</div>
                  {exploreCategories.map((item, idx) => (
                    item && (
                      <SheetClose key={`explore-${idx}`} asChild>
                        <Link
                          to={item.to}
                          className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md text-sm font-medium w-full"
                        >
                          {item.icon}
                          {item.label}
                          {item.label === "New" && (
                            <Badge className="ml-2 bg-green-500 hover:bg-green-600" variant="secondary">New</Badge>
                          )}
                        </Link>
                      </SheetClose>
                    )
                  ))}
                </div>
                
                <div className="mt-auto pt-4 border-t">
                  {!loading && (
                    <>
                      {user ? (
                        <div className="space-y-2">
                          <SheetClose asChild>
                            <Button asChild variant="outline" className="w-full justify-start">
                              <Link to="/profile">
                                <User className="mr-2 h-4 w-4" />
                                My Profile
                              </Link>
                            </Button>
                          </SheetClose>
                          
                          <SheetClose asChild>
                            <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                            </Button>
                          </SheetClose>
                        </div>
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
                            <Button asChild className="w-full bg-recipe-700 hover:bg-recipe-800">
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
      
      {showMobileSearch && (
        <div className="w-full px-4 py-2 bg-white md:hidden shadow-md">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="absolute right-1 top-1 bg-recipe-700 hover:bg-recipe-800 rounded-full px-3">
              Search
            </Button>
          </form>
        </div>
      )}
    </nav>
  );
};
