
import { useState, useEffect } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  PlayCircle, Search, Utensils, Clock, ThumbsUp, Salad, Drumstick, 
  Cake, ChefHat, Award, Calendar, BookOpen, TrendingUp, Heart, Coffee 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { smoothScrollToTop, observeElementsInView } from "@/lib/smoothScrollUtils";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Add animation when components come into view
  useEffect(() => {
    const cleanup = observeElementsInView('.animate-on-scroll', 'animate-in');
    return cleanup;
  }, []);

  const categories = ["all", ...new Set(MOCK_RECIPES.map(recipe => recipe.category))];
  
  const filteredRecipes = category === "all" 
    ? MOCK_RECIPES 
    : MOCK_RECIPES.filter(recipe => recipe.category === category);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const currentRecipes = filteredRecipes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Get vegetarian recipes
  const vegetarianRecipes = MOCK_RECIPES.filter(recipe => 
    recipe.category === "Indian" || 
    recipe.category === "Salads" || 
    recipe.category === "Italian" || 
    recipe.category === "Vegetarian"
  ).slice(0, 3);

  // Get non-vegetarian recipes
  const nonVegetarianRecipes = MOCK_RECIPES.filter(recipe => 
    recipe.category === "Asian" || 
    (recipe.title && recipe.title.includes("Chicken"))
  ).slice(0, 3);

  // Get dessert recipes
  const dessertRecipes = MOCK_RECIPES.filter(recipe => 
    recipe.category === "Desserts" || 
    recipe.category === "Baking"
  ).slice(0, 3);

  // Trending recipes based on hypothetical popularity
  const trendingRecipes = [...MOCK_RECIPES]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Featured chefs
  const featuredChefs = [
    {
      id: 1,
      name: "Sanjeev Kapoor",
      specialty: "Indian Cuisine",
      avatar: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=200&h=200&auto=format&fit=crop",
      recipes: 42
    },
    {
      id: 2,
      name: "Gordon Ramsay",
      specialty: "International",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=200&h=200&auto=format&fit=crop",
      recipes: 38
    },
    {
      id: 3,
      name: "Jamie Oliver",
      specialty: "Italian & Healthy",
      avatar: "https://images.unsplash.com/photo-1574966739987-65e8fd8dc667?q=80&w=200&h=200&auto=format&fit=crop",
      recipes: 55
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Quick & Easy Butter Chicken",
      thumbnail: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
      url: "/food-videos",
      duration: "12:45",
      views: "45K"
    },
    {
      id: 2,
      title: "Authentic Biryani Recipe",
      thumbnail: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
      url: "/food-videos",
      duration: "18:30",
      views: "32K"
    },
    {
      id: 3,
      title: "Homemade Naan Bread Recipe",
      thumbnail: "https://images.unsplash.com/photo-1584906093595-6b488e7f3c8e",
      url: "/food-videos",
      duration: "10:15",
      views: "28K"
    },
    {
      id: 4,
      title: "Perfect Vegetable Curry",
      thumbnail: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
      url: "/food-videos",
      duration: "14:20",
      views: "19K"
    },
    {
      id: 5,
      title: "Chocolate Cake From Scratch",
      thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      url: "/food-videos",
      duration: "16:40",
      views: "52K"
    },
    {
      id: 6,
      title: "Easy Homemade Pizza Dough",
      thumbnail: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      url: "/food-videos",
      duration: "09:55",
      views: "37K"
    }
  ];

  // Cooking tips
  const cookingTips = [
    {
      title: "Perfect Rice Every Time",
      tip: "Rinse rice thoroughly before cooking to remove excess starch. Use a 1:2 ratio of rice to water for perfect fluffy rice.",
      icon: <ChefHat className="h-8 w-8 text-amber-500" />
    },
    {
      title: "Knife Skills",
      tip: "Keep your knives sharp - dull knives are more dangerous than sharp ones. The claw grip technique protects your fingertips.",
      icon: <Utensils className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Taste As You Go",
      tip: "Seasoning should happen throughout the cooking process, not just at the end. Taste your food regularly and adjust.",
      icon: <Coffee className="h-8 w-8 text-green-500" />
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-recipe-100 via-recipe-200 to-recipe-300 rounded-3xl overflow-hidden shadow-lg mx-2 md:mx-4">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight font-playfair text-recipe-900 animate-in slide-in-from-bottom duration-500">
            Discover Your Next 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-recipe-700 to-recipe-900 px-2">
              Favorite
            </span>
            Recipe
          </h1>
          <p className="text-lg md:text-2xl text-recipe-700 font-poppins animate-in slide-in-from-bottom duration-500 delay-150">
            Explore our curated collection of delicious recipes from around the world
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-recipe-700 hover:bg-recipe-800">
              <Link to="/indian-recipes">
                Browse Indian Recipes
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/food-videos">
                Watch Cooking Videos
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/add-recipe">
                <Utensils className="mr-2 h-4 w-4" />
                Add Your Recipe
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trending This Week Section */}
      <section className="container px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-recipe-700 dark:text-recipe-400" />
              Trending This Week
            </h2>
            <p className="text-muted-foreground mt-1">Our most popular recipes right now</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/popular-recipes">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {trendingRecipes.map((recipe, index) => (
            <div 
              key={recipe.id} 
              className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <RecipeCard {...recipe} showBadge badgeText="Trending" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Chefs Section */}
      <section className="bg-muted/50 dark:bg-muted/20 py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Featured Chefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredChefs.map((chef) => (
              <Card key={chef.id} className="overflow-hidden animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-500">
                <div className="p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img 
                      src={chef.avatar} 
                      alt={chef.name} 
                      className="rounded-full object-cover w-full h-full border-4 border-recipe-200 dark:border-recipe-800"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-recipe-700 text-white p-1 rounded-full">
                      <ChefHat className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{chef.name}</h3>
                  <p className="text-muted-foreground mb-2">{chef.specialty}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="outline" className="font-normal">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {chef.recipes} Recipes
                    </Badge>
                    <Badge variant="secondary" className="bg-recipe-100 text-recipe-700 dark:bg-recipe-900 dark:text-recipe-100">
                      <Award className="h-3 w-3 mr-1" />
                      Top Chef
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="container px-4 md:px-6 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Cooking Tips & Tricks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cookingTips.map((tip, index) => (
            <Card key={index} className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-500" style={{ transitionDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-muted p-4 rounded-full">
                    {tip.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{tip.title}</h3>
                  <p className="text-muted-foreground">{tip.tip}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="container px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-500">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-amber-100 dark:bg-amber-950/40 p-3 rounded-full">
                <Utensils className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold">Create Recipes</h3>
              <p className="text-muted-foreground">Share your culinary masterpieces with our community. Add your own special recipes easily.</p>
              <Button asChild variant="outline">
                <Link to="/add-recipe">Start Creating</Link>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-500" style={{ transitionDelay: '100ms' }}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 dark:bg-blue-950/40 p-3 rounded-full">
                <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Find Recipes</h3>
              <p className="text-muted-foreground">Discover recipes from around the world. Use our search to find exactly what you're craving.</p>
              <Button asChild variant="outline">
                <Link to="/search">Search Recipes</Link>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-500" style={{ transitionDelay: '200ms' }}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-green-100 dark:bg-green-950/40 p-3 rounded-full">
                <PlayCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">Watch Videos</h3>
              <p className="text-muted-foreground">Learn cooking techniques with our curated collection of instructional videos.</p>
              <Button asChild variant="outline">
                <Link to="/food-videos">Watch Now</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="space-y-6 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Videos</h2>
            <p className="text-muted-foreground mt-1">Learn from our best cooking tutorials</p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/food-videos">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <Link 
              key={video.id} 
              to={video.url}
              className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg border-transparent hover:border-recipe-300 dark:hover:border-recipe-700">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg group-hover:text-recipe-700 dark:group-hover:text-recipe-400 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    {video.views} views
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recipe Categories */}
      <section className="space-y-8 px-4 md:px-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <h2 className="text-3xl font-bold">Explore Recipes</h2>
            <TabsList className="w-full md:w-auto overflow-x-auto flex-wrap justify-start">
              <TabsTrigger value="all" className="px-4">All Recipes</TabsTrigger>
              <TabsTrigger value="vegetarian" className="px-4">
                <Salad className="mr-2 h-4 w-4 text-green-600" />
                Vegetarian
              </TabsTrigger>
              <TabsTrigger value="non-vegetarian" className="px-4">
                <Drumstick className="mr-2 h-4 w-4 text-red-600" />
                Non-Vegetarian
              </TabsTrigger>
              <TabsTrigger value="desserts" className="px-4">
                <Cake className="mr-2 h-4 w-4 text-purple-600" />
                Desserts & Sweets
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="transform transition-all duration-300 hover:scale-[1.02] animate-on-scroll opacity-0 translate-y-8"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <RecipeCard {...recipe} />
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="font-poppins hover:bg-recipe-100 dark:hover:bg-recipe-900 transition-colors"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "outline"}
                    onClick={() => setPage(i + 1)}
                    className={`font-poppins transition-colors ${
                      page === i + 1 
                        ? "bg-recipe-700 hover:bg-recipe-800 dark:bg-recipe-600 dark:hover:bg-recipe-700" 
                        : "hover:bg-recipe-100 dark:hover:bg-recipe-900"
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="font-poppins hover:bg-recipe-100 dark:hover:bg-recipe-900 transition-colors"
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="vegetarian" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {vegetarianRecipes.map((recipe, index) => (
                <div 
                  key={recipe.id} 
                  className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <RecipeCard {...recipe} showBadge badgeText="Vegetarian" badgeColor="bg-green-500" />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/popular-recipes?filter=vegetarian">View All Vegetarian Recipes</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="non-vegetarian" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {nonVegetarianRecipes.map((recipe, index) => (
                <div 
                  key={recipe.id} 
                  className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <RecipeCard {...recipe} showBadge badgeText="Non-Veg" badgeColor="bg-red-500" />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/popular-recipes?filter=non-vegetarian">View All Non-Vegetarian Recipes</Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="desserts" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {dessertRecipes.map((recipe, index) => (
                <div 
                  key={recipe.id} 
                  className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <RecipeCard {...recipe} showBadge badgeText="Dessert" badgeColor="bg-purple-500" />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/popular-recipes?filter=dessert">View All Desserts & Sweets</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Cuisines Categories */}
      <section className="container py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Cuisines</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* First cuisine card */}
          <Link to="/popular-recipes?filter=vegetarian" className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999" 
                alt="Vegetarian Recipes" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center mb-2">
                    <Salad className="h-5 w-5 text-green-400 mr-2" />
                    <span className="font-semibold">Vegetarian</span>
                  </div>
                  <p className="text-sm opacity-90">Explore delicious meat-free dishes</p>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Second cuisine card */}
          <Link to="/popular-recipes?filter=non-vegetarian" className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1512058564366-18510be2db19" 
                alt="Non-Vegetarian Recipes" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center mb-2">
                    <Drumstick className="h-5 w-5 text-red-400 mr-2" />
                    <span className="font-semibold">Non-Vegetarian</span>
                  </div>
                  <p className="text-sm opacity-90">Delicious meat-based recipes</p>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Third cuisine card */}
          <Link to="/popular-recipes?filter=dessert" className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1587314168485-3236d6710814" 
                alt="Desserts" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center mb-2">
                    <Cake className="h-5 w-5 text-purple-400 mr-2" />
                    <span className="font-semibold">Desserts</span>
                  </div>
                  <p className="text-sm opacity-90">Sweet treats and baked delights</p>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Fourth cuisine card */}
          <Link to="/indian-recipes" className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc" 
                alt="Indian Cuisine" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="font-semibold">Indian Cuisine</span>
                  </div>
                  <p className="text-sm opacity-90">Explore flavorful Indian dishes</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-recipe-100/50 dark:bg-recipe-900/30 py-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Get Weekly Recipe Inspiration</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive hand-picked recipes, cooking tips, and exclusive content directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              required
            />
            <Button type="submit" className="bg-recipe-700 hover:bg-recipe-800 dark:bg-recipe-600 dark:hover:bg-recipe-700">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container px-4 py-14">
        <div className="bg-gradient-to-r from-recipe-700 to-recipe-900 dark:from-recipe-800 dark:to-recipe-950 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Culinary Masterpiece?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join our community of food enthusiasts and share your favorite recipes with the world. It's easy, fun, and free!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/add-recipe">
                <Utensils className="mr-2 h-4 w-4" />
                Add Your Recipe
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
