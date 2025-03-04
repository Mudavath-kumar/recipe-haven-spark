
import { useCallback, useEffect, useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { MOCK_RECIPES } from "@/lib/mock-data";
import ProjectPresentation from "@/components/ProjectPresentation";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Index() {
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [visibleRecipes, setVisibleRecipes] = useState(6);
  
  const loadMoreRecipes = useCallback(() => {
    setVisibleRecipes(prev => Math.min(prev + 6, MOCK_RECIPES.length));
  }, []);
  
  const toggleProjectDetails = useCallback(() => {
    setShowProjectDetails(prev => !prev);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Recipe Haven</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover a world of delicious recipes from various cuisines. Whether you're looking for comfort food, 
          quick meals, or gourmet creations, we have something for everyone.
        </p>
        <Button 
          onClick={toggleProjectDetails} 
          variant="outline" 
          className="mt-6 flex items-center gap-2"
        >
          {showProjectDetails ? "Hide Project Details" : "Show Project Details"}
          {showProjectDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </section>
      
      {showProjectDetails && (
        <section className="mb-12">
          <ProjectPresentation />
        </section>
      )}
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_RECIPES.slice(0, visibleRecipes).map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              time={recipe.time}
              servings={recipe.servings}
              category={recipe.category}
            />
          ))}
        </div>
        
        {visibleRecipes < MOCK_RECIPES.length && (
          <div className="text-center mt-8">
            <Button onClick={loadMoreRecipes}>Load More Recipes</Button>
          </div>
        )}
      </section>
    </div>
  );
}
