
import { useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PlayCircle, Search, Utensils, Clock, ThumbsUp } from "lucide-react";

const Index = () => {
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ["all", ...new Set(MOCK_RECIPES.map(recipe => recipe.category))];
  
  const filteredRecipes = category === "all" 
    ? MOCK_RECIPES 
    : MOCK_RECIPES.filter(recipe => recipe.category === category);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const currentRecipes = filteredRecipes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const videos = [
    {
      id: 1,
      title: "Quick & Easy Butter Chicken",
      thumbnail: "https://img.youtube.com/vi/pqpDYRZ3pYQ/maxresdefault.jpg",
      url: "/food-videos"
    },
    {
      id: 2,
      title: "Authentic Biryani Recipe",
      thumbnail: "https://img.youtube.com/vi/nC5IFSnluZY/maxresdefault.jpg",
      url: "/food-videos"
    },
    {
      id: 3,
      title: "Homemade Naan Bread Recipe",
      thumbnail: "https://img.youtube.com/vi/0n47msSQllA/maxresdefault.jpg",
      url: "/food-videos"
    },
  ];

  return (
    <div className="space-y-12">
      <section className="relative py-24 px-6 bg-gradient-to-br from-recipe-100 via-recipe-200 to-recipe-300 rounded-3xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-playfair text-recipe-900 animate-in slide-in-from-bottom duration-500">
            Discover Your Next 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-recipe-700 to-recipe-900 px-2">
              Favorite
            </span>
            Recipe
          </h1>
          <p className="text-xl md:text-2xl text-recipe-700 font-poppins animate-in slide-in-from-bottom duration-500 delay-150">
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

      {/* Featured Section */}
      <section className="container px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Utensils className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold">Create Recipes</h3>
              <p className="text-muted-foreground">Share your culinary masterpieces with our community. Add your own special recipes easily.</p>
              <Button asChild variant="outline">
                <Link to="/add-recipe">Start Creating</Link>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Find Recipes</h3>
              <p className="text-muted-foreground">Discover recipes from around the world. Use our search to find exactly what you're craving.</p>
              <Button asChild variant="outline">
                <Link to="/search">Search Recipes</Link>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-green-100 p-3 rounded-full">
                <PlayCircle className="h-8 w-8 text-green-600" />
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
      <section className="space-y-6 px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Videos</h2>
          <Button asChild variant="ghost">
            <Link to="/food-videos">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link key={video.id} to={video.url}>
              <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-10 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="text-3xl font-bold">Popular Recipes</h2>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-64 font-poppins bg-white/50 backdrop-blur-sm border-recipe-200">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="font-poppins">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentRecipes.map((recipe, index) => (
            <div
              key={recipe.id}
              className="transform transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
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
              className="font-poppins hover:bg-recipe-100 transition-colors"
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
                    ? "bg-recipe-700 hover:bg-recipe-800" 
                    : "hover:bg-recipe-100"
                }`}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="font-poppins hover:bg-recipe-100 transition-colors"
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
