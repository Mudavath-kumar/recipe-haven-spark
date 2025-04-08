import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { RecipeCard } from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { INDIAN_RECIPES } from "@/pages/IndianRecipes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { collections } from "@/integrations/mongodb/client";
import { Recipe } from "@/integrations/mongodb/types";

const MOCK_RECIPES = [
  {
    id: "mock-1",
    title: "Pasta Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, and bacon",
    image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    cooking_time: 30,
    category: "Italian",
    servings: 4,
    difficulty: "Medium"
  },
  {
    id: "mock-2",
    title: "Greek Salad",
    description: "Fresh Mediterranean salad with tomatoes, cucumbers, and feta cheese",
    image: "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    cooking_time: 15,
    category: "Greek",
    servings: 2,
    difficulty: "Easy"
  }
];

const searchRecipes = async (query: string) => {
  try {
    // Try to search in MongoDB
    const recipesFromDB = await collections.recipes.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).toArray();
    
    // If we got results from MongoDB, return them
    if (recipesFromDB && recipesFromDB.length > 0) {
      return recipesFromDB.map((recipe: Recipe) => ({
        id: recipe._id?.toString() || recipe.id || '',
        title: recipe.title,
        description: recipe.description || 'No description available',
        image: recipe.image_url,
        cooking_time: recipe.cooking_time || 30,
        category: recipe.category || 'Other',
        servings: 4,
        difficulty: recipe.difficulty || 'Medium'
      }));
    }
    
    // Otherwise search in our mock data
    const mockResults = [
      ...MOCK_RECIPES.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.toLowerCase().includes(query.toLowerCase())
      ),
      ...INDIAN_RECIPES.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.toLowerCase().includes(query.toLowerCase())
      )
    ];
    
    return mockResults;
  } catch (error) {
    console.error("Error searching recipes:", error);
    
    // Fallback to mock data if MongoDB search fails
    const mockResults = [
      ...MOCK_RECIPES.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.toLowerCase().includes(query.toLowerCase())
      ),
      ...INDIAN_RECIPES.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.toLowerCase().includes(query.toLowerCase())
      )
    ];
    
    return mockResults;
  }
};

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);

  const { data: results, isLoading, refetch } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchRecipes(query),
    enabled: !!query
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query, refetch]);

  return (
    <div className="space-y-8 container py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
        {query && <p className="text-muted-foreground">Search results for "{query}"</p>}
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : results && results.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((recipe: any) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description || "No description available"}
              image={recipe.image_url || recipe.image}
              time={recipe.cooking_time ? `${recipe.cooking_time} mins` : "30 mins"}
              servings={recipe.servings || 4}
              category={recipe.category || "Other"}
            />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No recipes found for "{query}"</h3>
          <p className="text-muted-foreground mt-2">Try a different search term or browse our categories</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResults;
