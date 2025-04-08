
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { RecipeCard } from "@/components/RecipeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { collections } from "@/integrations/mongodb/client";
import { Recipe } from "@/integrations/mongodb/types";
import { INDIAN_RECIPES } from "./IndianRecipes";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchRecipes = async () => {
      setLoading(true);
      try {
        // In a real app, we would search MongoDB
        // For this demo, we'll search the mock data instead
        
        // Just log the query to show we're trying to search
        console.log("Searching for:", query);
        const recipesResult = await collections.recipes.find();
        console.log("Would normally search MongoDB, but using mock data for demo");
        
        // Filter INDIAN_RECIPES by the search query
        const filtered = INDIAN_RECIPES.filter(recipe => 
          recipe.title.toLowerCase().includes(query.toLowerCase()) || 
          recipe.description.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(filtered);
      } catch (error) {
        console.error("Error searching recipes:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchRecipes();
  }, [query]);

  const formatResults = (recipes: any[]) => {
    return recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description || "",
      image: recipe.image_url,
      cooking_time: recipe.cooking_time || 30,
      category: recipe.category || "Other",
      servings: recipe.servings || 4,
      difficulty: recipe.difficulty || "medium"
    }));
  };

  if (loading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">
        {results.length 
          ? `Search Results for "${query}" (${results.length} results)` 
          : `No results found for "${query}"`}
      </h1>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formatResults(results).map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              time={`${recipe.cooking_time} mins`}
              servings={recipe.servings}
              category={recipe.category}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Try searching for a different term or browse our recipe categories.
        </p>
      )}
    </div>
  );
};

export default SearchResults;
