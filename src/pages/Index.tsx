
import { useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const categories = ["all", ...new Set(MOCK_RECIPES.map(recipe => recipe.category))];
  
  const filteredRecipes = category === "all" 
    ? MOCK_RECIPES 
    : MOCK_RECIPES.filter(recipe => recipe.category === category);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const currentRecipes = filteredRecipes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
        </div>
      </section>

      <section className="space-y-10 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
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
