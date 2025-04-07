
import { EnhancedRecipeCard } from "@/components/EnhancedRecipeCard";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const NewRecipes = () => {
  // For demonstration, we'll split recipes by category
  const categories = [...new Set(MOCK_RECIPES.map(recipe => recipe.category))];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading to demonstrate animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container px-4 py-10 space-y-8 transition-all duration-300">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-playfair">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-recipe-700 to-recipe-900 dark:from-recipe-400 dark:to-recipe-600">
              New Recipes
            </span>
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover our latest culinary creations and be inspired to try something new in your kitchen
          </p>
        </div>
        
        <Tabs defaultValue={categories[0]} className="space-y-6">
          <TabsList className="flex flex-wrap bg-background border dark:border-gray-800 p-1 rounded-lg">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="rounded-md data-[state=active]:bg-recipe-100 data-[state=active]:text-recipe-900 dark:data-[state=active]:bg-recipe-900/20 dark:data-[state=active]:text-recipe-300"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="pt-4">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[400px] rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {MOCK_RECIPES.filter(recipe => recipe.category === category)
                    .map((recipe, index) => (
                      <div 
                        key={recipe.id} 
                        className="animate-in fade-in duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <EnhancedRecipeCard 
                          {...recipe} 
                          featured={index === 0} 
                        />
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
};

export default NewRecipes;
