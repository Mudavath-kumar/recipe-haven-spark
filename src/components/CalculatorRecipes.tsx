
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Calculator } from "lucide-react";

interface CalculatorRecipe {
  id: number;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty?: string;
  category: string;
}

const calculatorRecipes: CalculatorRecipe[] = [
  {
    id: 101,
    title: "Simple Arithmetic Pancakes",
    description: "Learn to measure ingredients precisely with this fun mathematical recipe.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    time: "30 min",
    difficulty: "Easy",
    category: "Breakfast"
  },
  {
    id: 102,
    title: "Division Fruit Salad",
    description: "Cut fruits into equal portions using division principles.",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea",
    time: "15 min",
    difficulty: "Easy",
    category: "Salads"
  },
  {
    id: 103,
    title: "Multiplication Chocolate Chip Cookies",
    description: "Use multiplication to scale this recipe for any party size.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    time: "45 min",
    difficulty: "Medium",
    category: "Desserts"
  },
  {
    id: 104,
    title: "Addition Vegetable Soup",
    description: "Add ingredients one by one to create a delicious soup.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    time: "60 min",
    difficulty: "Medium",
    category: "Soups"
  },
  {
    id: 105,
    title: "Percentage Perfect Pizza",
    description: "Learn about percentages by calculating the perfect ratio of toppings.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    time: "45 min",
    difficulty: "Hard",
    category: "Italian"
  }
];

const CalculatorRecipes = () => {
  return (
    <section className="space-y-6 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-recipe-700" />
          <h2 className="text-3xl font-bold">Math-Inspired Recipes</h2>
        </div>
        <Button asChild variant="outline">
          <Link to="/popular-recipes">View All</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {calculatorRecipes.map((recipe, index) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{recipe.time}</span>
                    {recipe.difficulty && (
                      <>
                        <span className="mx-1">•</span>
                        <ChefHat className="h-4 w-4" />
                        <span className="text-sm font-medium">{recipe.difficulty}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{recipe.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{recipe.description}</p>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 text-xs bg-recipe-100 text-recipe-800 rounded-full">
                    {recipe.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CalculatorRecipes;
