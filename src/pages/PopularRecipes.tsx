
import { useState, useEffect } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PopularRecipes = () => {
  // For demonstration, we'll take the first 6 recipes as "popular"
  const popularRecipes = MOCK_RECIPES.slice(0, 6);

  return (
    <div className="container py-12 space-y-8">
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Popular Recipes</h1>
          <p className="text-muted-foreground">
            Our most loved and frequently cooked recipes
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {popularRecipes.map((recipe) => (
            <div key={recipe.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-md">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">{recipe.title}</h2>
                  <p className="text-muted-foreground mt-2">{recipe.description}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span>⏰ {recipe.time}</span>
                  <span>👥 {recipe.servings} servings</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Ingredients:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm">{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <Button asChild>
                  <Link to={`/recipe/${recipe.id}`}>View Full Recipe</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularRecipes;
