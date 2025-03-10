
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
  servings: number;
  ingredients?: string[];
  instructions?: string[];
}

const calculatorRecipes: CalculatorRecipe[] = [
  {
    id: 101,
    title: "Simple Arithmetic Pancakes",
    description: "Learn to measure ingredients precisely with this fun mathematical recipe.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    time: "30 min",
    difficulty: "Easy",
    category: "Breakfast",
    servings: 4,
    ingredients: [
      "2 cups all-purpose flour",
      "2 tablespoons sugar",
      "1 teaspoon baking powder",
      "1/2 teaspoon baking soda",
      "1/2 teaspoon salt",
      "2 cups buttermilk",
      "2 large eggs",
      "1/4 cup melted butter",
      "1 teaspoon vanilla extract"
    ],
    instructions: [
      "In a large bowl, combine the flour, sugar, baking powder, baking soda, and salt.",
      "In another bowl, whisk together the buttermilk, eggs, melted butter, and vanilla.",
      "Pour the wet ingredients into the dry ingredients and stir until just combined. Don't overmix!",
      "Heat a griddle or non-stick pan over medium heat. Add a small amount of butter or oil.",
      "For each pancake, pour 1/4 cup of batter onto the griddle.",
      "Cook until bubbles form on the surface, then flip and cook until golden brown on the other side.",
      "Serve with maple syrup and fresh fruits."
    ]
  },
  {
    id: 102,
    title: "Division Fruit Salad",
    description: "Cut fruits into equal portions using division principles.",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea",
    time: "15 min",
    difficulty: "Easy",
    category: "Salads",
    servings: 6,
    ingredients: [
      "1 medium watermelon, cubed",
      "2 cups strawberries, halved",
      "2 oranges, segmented",
      "1 cup blueberries",
      "1 cup grapes, halved",
      "3 kiwis, peeled and sliced",
      "2 tablespoons honey",
      "2 tablespoons lime juice",
      "Fresh mint leaves for garnish"
    ],
    instructions: [
      "Wash all fruits thoroughly.",
      "Cut the watermelon, strawberries, oranges, grapes, and kiwis into equal-sized pieces.",
      "In a large bowl, combine all the cut fruits and blueberries.",
      "In a small bowl, mix honey and lime juice.",
      "Pour the honey-lime dressing over the fruits and toss gently.",
      "Refrigerate for at least 30 minutes before serving.",
      "Garnish with fresh mint leaves before serving."
    ]
  },
  {
    id: 103,
    title: "Multiplication Chocolate Chip Cookies",
    description: "Use multiplication to scale this recipe for any party size.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    time: "45 min",
    difficulty: "Medium",
    category: "Desserts",
    servings: 24,
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "1 cup (2 sticks) unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "1 teaspoon vanilla extract",
      "2 large eggs",
      "2 cups semi-sweet chocolate chips",
      "1 cup chopped nuts (optional)"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a small bowl, combine flour, baking soda, and salt.",
      "In a large mixing bowl, beat butter, granulated sugar, brown sugar, and vanilla until creamy.",
      "Add eggs one at a time, beating well after each addition.",
      "Gradually beat in flour mixture.",
      "Stir in chocolate chips and nuts if using.",
      "Drop by rounded tablespoon onto ungreased baking sheets.",
      "Bake for 9 to 11 minutes or until golden brown.",
      "Cool on baking sheets for 2 minutes; remove to wire racks to cool completely."
    ]
  },
  {
    id: 104,
    title: "Addition Vegetable Soup",
    description: "Add ingredients one by one to create a delicious soup.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    time: "60 min",
    difficulty: "Medium",
    category: "Soups",
    servings: 8,
    ingredients: [
      "2 tablespoons olive oil",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 carrots, diced",
      "2 celery stalks, diced",
      "1 red bell pepper, diced",
      "1 cup green beans, trimmed and cut",
      "1 cup corn kernels",
      "1 cup peas",
      "1 can (14.5 oz) diced tomatoes",
      "8 cups vegetable broth",
      "1 teaspoon dried thyme",
      "1 teaspoon dried oregano",
      "Salt and pepper to taste",
      "2 tablespoons fresh parsley, chopped"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat.",
      "Add onions and garlic, sauté until translucent.",
      "Add carrots and celery, cook for 5 minutes.",
      "Add bell pepper and green beans, cook for another 3 minutes.",
      "Add corn, peas, diced tomatoes, and vegetable broth.",
      "Stir in thyme and oregano.",
      "Bring to a boil, then reduce heat and simmer for 25-30 minutes or until vegetables are tender.",
      "Season with salt and pepper to taste.",
      "Sprinkle with fresh parsley before serving."
    ]
  },
  {
    id: 105,
    title: "Percentage Perfect Pizza",
    description: "Learn about percentages by calculating the perfect ratio of toppings.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    time: "45 min",
    difficulty: "Hard",
    category: "Italian",
    servings: 4,
    ingredients: [
      "2 1/4 teaspoons active dry yeast",
      "1 teaspoon sugar",
      "1 cup warm water",
      "2 1/2 cups all-purpose flour",
      "2 tablespoons olive oil",
      "1 teaspoon salt",
      "1 cup tomato sauce",
      "2 cups shredded mozzarella cheese",
      "1/2 cup sliced mushrooms",
      "1/2 cup sliced bell peppers",
      "1/4 cup sliced red onions",
      "1/4 cup sliced black olives",
      "1/4 cup fresh basil leaves",
      "1 tablespoon dried oregano"
    ],
    instructions: [
      "In a small bowl, dissolve yeast and sugar in warm water. Let stand for 5-10 minutes until foamy.",
      "In a large bowl, combine flour and salt. Make a well in the center and add yeast mixture and olive oil.",
      "Stir until a dough forms, then knead on a floured surface for about 5 minutes until smooth and elastic.",
      "Place dough in an oiled bowl, cover, and let rise in a warm place for 45 minutes or until doubled in size.",
      "Preheat oven to 450°F (230°C).",
      "Punch down dough and roll out on a floured surface to form a 12-inch circle.",
      "Transfer to a pizza pan or baking sheet and spread tomato sauce evenly over the dough.",
      "Sprinkle with mozzarella cheese and arrange toppings evenly.",
      "Bake for 15-20 minutes or until crust is golden and cheese is bubbly.",
      "Sprinkle with fresh basil before serving."
    ]
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
