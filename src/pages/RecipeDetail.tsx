
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Printer, 
  Share2, 
  Users, 
  Plus, 
  Heart, 
  Bookmark, 
  ChefHat, 
  Timer, 
  AlertCircle, 
  Star, 
  Utensils, 
  ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { INDIAN_RECIPES } from "./IndianRecipes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Ingredient = {
  name: string;
  amount: string;
  unit: string | null;
};

type DetailedRecipe = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  cooking_time: number;
  category: string;
  instructions: string;
  ingredients: Ingredient[];
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // First check if we can find the recipe in INDIAN_RECIPES
  const indianRecipe = (INDIAN_RECIPES as DetailedRecipe[]).find(r => r.id === id);
  
  // If not found in Indian recipes, check MOCK_RECIPES
  const mockRecipe = !indianRecipe ? MOCK_RECIPES.find(r => r.id === Number(id)) : null;
  
  const recipe = indianRecipe || mockRecipe;

  const handleShare = async () => {
    try {
      await navigator.share({
        title: recipe?.title,
        text: recipe?.description,
        url: window.location.href,
      });
    } catch (err) {
      toast.success("Copied to clipboard!", {
        description: "Recipe link has been copied to your clipboard.",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleSaveRecipe = () => {
    toast.success("Recipe saved!", {
      description: "This recipe has been saved to your collection.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLike = () => {
    toast.success("Recipe liked!", {
      description: "You've added this recipe to your favorites.",
    });
  };

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <AlertCircle className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Recipe not found</h2>
        <p className="text-muted-foreground text-center max-w-md">
          We couldn't find the recipe you're looking for. It may have been removed or the link might be incorrect.
        </p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  // Get nutrition facts
  const nutritionFacts = {
    calories: "320",
    fat: "12g",
    carbs: "42g",
    protein: "18g",
    fiber: "4g",
    sugar: "8g"
  };

  // Get cooking tips
  const cookingTips = [
    "Marinate the meat overnight for deeper flavor",
    "Use freshly ground spices for the best aroma",
    "Toast the spices before adding them to enhance their flavors",
    "Let the curry simmer on low heat for a richer taste"
  ];

  // Format instructions based on source
  const instructionSteps = indianRecipe ? 
    indianRecipe.instructions.split("\n") : 
    mockRecipe?.instructions?.map((instruction, i) => `${i+1}. ${instruction}`) || [];

  // Calculate recipe rating (would come from a database in a real app)
  const rating = 4.7;

  // Get difficulty
  const difficulty = "Medium";

  // Get preparation time (separate from cooking time)
  const prepTime = indianRecipe ? 15 : 20;

  return (
    <article className="max-w-6xl mx-auto space-y-8 px-4 py-8">
      {/* Back button and recipe meta */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to recipes
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
          ))}
          <span className="text-sm font-medium">{rating} ({Math.floor(Math.random() * 500) + 100} reviews)</span>
        </div>
      </div>

      {/* Recipe header */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="font-poppins">{recipe.category}</Badge>
          <Badge variant="outline" className="font-poppins">{difficulty} difficulty</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-playfair">{recipe.title}</h1>
        <p className="text-xl text-muted-foreground font-poppins">{recipe.description}</p>
        
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-orange-500" />
            <div>
              <span className="block font-semibold">Prep Time</span>
              <span className="font-poppins">{prepTime} mins</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <div>
              <span className="block font-semibold">Cook Time</span>
              <span className="font-poppins">{indianRecipe ? indianRecipe.cooking_time : recipe.time} mins</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            <div>
              <span className="block font-semibold">Servings</span>
              <span className="font-poppins">{recipe.servings} servings</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-orange-500" />
            <div>
              <span className="block font-semibold">Chef</span>
              <span className="font-poppins">Professional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe image */}
      <div className="aspect-video overflow-hidden rounded-xl">
        <img
          src={indianRecipe ? indianRecipe.image_url : recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Recipe content tabs */}
      <Tabs defaultValue="recipe" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="recipe">Recipe</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="tips">Tips & Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipe" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold font-playfair flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-500" />
                Ingredients
              </h2>
              <ul className="space-y-3">
                {indianRecipe 
                  ? indianRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 font-poppins p-2 hover:bg-orange-50 rounded-md">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </li>
                    ))
                  : recipe.ingredients?.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 font-poppins p-2 hover:bg-orange-50 rounded-md">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        {ingredient}
                      </li>
                    ))
                }
              </ul>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold font-playfair flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-orange-500" />
                Instructions
              </h2>
              <ol className="space-y-4">
                {instructionSteps.map((instruction, index) => (
                  <li key={index} className="flex gap-4 font-poppins group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      {index + 1}
                    </div>
                    <div className="pt-1">
                      {instruction}
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="nutrition" className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold font-playfair mb-4">Nutrition Facts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(nutritionFacts).map(([key, value]) => (
                <div key={key} className="p-4 border rounded-lg text-center">
                  <p className="text-muted-foreground capitalize">{key}</p>
                  <p className="text-2xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="tips" className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold font-playfair mb-4">Cooking Tips & Notes</h2>
            <ul className="space-y-3">
              {cookingTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 font-poppins p-2 hover:bg-orange-50 rounded-md">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="pt-1">{tip}</div>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Recipe actions */}
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={handlePrint} variant="outline" className="flex-1 sm:flex-none font-poppins">
          <Printer className="mr-2 h-4 w-4" />
          Print Recipe
        </Button>
        <Button onClick={handleShare} variant="outline" className="flex-1 sm:flex-none font-poppins">
          <Share2 className="mr-2 h-4 w-4" />
          Share Recipe
        </Button>
        <Button onClick={handleSaveRecipe} variant="outline" className="flex-1 sm:flex-none font-poppins">
          <Bookmark className="mr-2 h-4 w-4" />
          Save Recipe
        </Button>
        <Button onClick={handleLike} className="flex-1 sm:flex-none font-poppins bg-orange-500 hover:bg-orange-600">
          <Heart className="mr-2 h-4 w-4" />
          Like Recipe
        </Button>
      </div>

      {/* Related recipes section */}
      <div className="pt-8">
        <h2 className="text-2xl font-semibold font-playfair mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_RECIPES.slice(0, 3).map((relatedRecipe) => (
            <Card key={relatedRecipe.id} className="overflow-hidden group cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate(`/recipe/${relatedRecipe.id}`)}>
              <div className="aspect-video overflow-hidden">
                <img
                  src={relatedRecipe.image}
                  alt={relatedRecipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <Badge className="mb-2">{relatedRecipe.category}</Badge>
                <h3 className="font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors">
                  {relatedRecipe.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{relatedRecipe.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </article>
  );
};

export default RecipeDetail;
