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
  ArrowLeft,
  Check
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
  servings?: number;
};

type MockRecipe = {
  id: number;
  title: string;
  description: string;
  image: string;
  time: string;
  servings: number;
  category: string;
  ingredients?: string[];
  instructions?: string[];
};

const DISH_SPECIFIC_IMAGES: Record<string, string> = {
  "Butter Chicken": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
  "Chicken Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
  "Tandoori Chicken": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
  "Paneer Tikka": "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
  "Palak Paneer": "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  "Chole Bhature": "https://images.unsplash.com/photo-1626132647957-5659d0bc9222",
  "Dal Makhani": "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
  "Masala Dosa": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
  "Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
  
  "Classic Margherita Pizza": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
  "Mushroom Risotto": "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
  "Vegetable Lasagna": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0",
  "Chicken Alfredo Pasta": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
  
  "Chocolate Chip Cookies": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
  "Banana Bread": "https://images.unsplash.com/photo-1584736286279-4a5f6e2b0858",
  "Tiramisu": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
  "Red Velvet Cake": "https://images.unsplash.com/photo-1586788680434-30d324626f14",
  "Mango Sticky Rice": "https://images.unsplash.com/photo-1565538810643-b5bdb714032a",
  
  "Greek Salad": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  "Caesar Salad": "https://images.unsplash.com/photo-1546793665-c74683f339c1",
  
  "Beef Stir Fry": "https://images.unsplash.com/photo-1512058564366-18510be2db19",
  "Thai Green Curry with Chicken": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
  "Spicy Tuna Sushi Roll": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
  
  "Vegetable Curry": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd"
};

const getRecipeImage = (title: string, category: string, providedImage: string): string => {
  if (providedImage && !providedImage.includes("undefined") && providedImage.startsWith("http")) {
    return providedImage;
  }
  
  if (DISH_SPECIFIC_IMAGES[title]) {
    return DISH_SPECIFIC_IMAGES[title];
  }
  
  const categoryImages: Record<string, string> = {
    'Indian': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    'Italian': 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    'Chinese': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'Desserts': 'https://images.unsplash.com/photo-1587314168485-3236d6710814',
    'Baking': 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94',
    'Salads': 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
    'Asian': 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a',
    'Vegetarian': 'https://images.unsplash.com/photo-1543362906-acfc16c67564',
    'Non-Vegetarian': 'https://images.unsplash.com/photo-1607116667981-27b1f21c5c04',
    'default': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9'
  };

  return categoryImages[category] || categoryImages.default;
};

const DEFAULT_INGREDIENTS: Record<string, string[]> = {
  'Italian Pasta': [
    '400g spaghetti or favorite pasta',
    '2 tbsp olive oil',
    '4 cloves garlic, minced',
    '1 can (400g) crushed tomatoes',
    '1 tsp dried oregano',
    '1 tsp dried basil',
    'Salt and pepper to taste',
    'Grated Parmesan cheese for serving',
    'Fresh basil leaves for garnish'
  ],
  'Chocolate Cake': [
    '2 cups all-purpose flour',
    '2 cups sugar',
    '3/4 cup unsweetened cocoa powder',
    '2 tsp baking soda',
    '1 tsp baking powder',
    '1 tsp salt',
    '2 eggs',
    '1 cup buttermilk',
    '1/2 cup vegetable oil',
    '2 tsp vanilla extract',
    '1 cup hot coffee'
  ],
  'Chicken Curry': [
    '500g chicken thighs, cut into pieces',
    '2 onions, finely chopped',
    '3 cloves garlic, minced',
    '1 tbsp ginger, grated',
    '2 tbsp curry powder',
    '1 can (400ml) coconut milk',
    '1 tbsp vegetable oil',
    'Salt to taste',
    'Fresh cilantro for garnish',
    '1 tomato, chopped'
  ],
  'Vegetable Stir Fry': [
    '2 cups mixed vegetables (bell peppers, broccoli, carrots, snap peas)',
    '2 tbsp sesame oil',
    '2 cloves garlic, minced',
    '1 tbsp ginger, grated',
    '3 tbsp soy sauce',
    '1 tbsp honey or maple syrup',
    '1 tsp cornstarch mixed with 2 tbsp water',
    'Sesame seeds for garnish',
    'Green onions, sliced'
  ],
  'Caesar Salad': [
    '1 large romaine lettuce, chopped',
    '1/2 cup croutons',
    '1/4 cup grated Parmesan cheese',
    '2 tbsp olive oil',
    '1 tbsp lemon juice',
    '1 tsp Dijon mustard',
    '1 clove garlic, minced',
    '1 anchovy fillet, minced (optional)',
    'Salt and pepper to taste'
  ]
};

const getDefaultIngredients = (recipe: MockRecipe): string[] => {
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    return recipe.ingredients;
  }
  
  if (DEFAULT_INGREDIENTS[recipe.title]) {
    return DEFAULT_INGREDIENTS[recipe.title];
  }
  
  if (recipe.category === 'Italian') {
    return DEFAULT_INGREDIENTS['Italian Pasta'];
  } else if (recipe.category === 'Desserts') {
    return DEFAULT_INGREDIENTS['Chocolate Cake'];
  } else if (recipe.category === 'Salads') {
    return DEFAULT_INGREDIENTS['Caesar Salad'];
  } else if (recipe.category === 'Asian') {
    return DEFAULT_INGREDIENTS['Vegetable Stir Fry'];
  } else {
    return DEFAULT_INGREDIENTS['Chicken Curry'];
  }
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const indianRecipe = (INDIAN_RECIPES as DetailedRecipe[]).find(r => r.id === id);
  
  const mockRecipe = !indianRecipe ? MOCK_RECIPES.find(r => r.id === Number(id)) as MockRecipe : null;
  
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

  const nutritionFacts = {
    calories: "320",
    fat: "12g",
    carbs: "42g",
    protein: "18g",
    fiber: "4g",
    sugar: "8g"
  };

  const cookingTips = [
    "Marinate the meat overnight for deeper flavor",
    "Use freshly ground spices for the best aroma",
    "Toast the spices before adding them to enhance their flavors",
    "Let the curry simmer on low heat for a richer taste"
  ];

  const recipeIngredients = mockRecipe 
    ? (mockRecipe.ingredients?.length ? mockRecipe.ingredients : getDefaultIngredients(mockRecipe))
    : indianRecipe?.ingredients || [];

  const instructionSteps = indianRecipe ? 
    indianRecipe.instructions.split("\n") : 
    mockRecipe?.instructions?.map((instruction, i) => `${i+1}. ${instruction}`) || [];

  const rating = 4.7;

  const difficulty = "Medium";

  const prepTime = indianRecipe ? 15 : 20;

  const cookTime = indianRecipe ? indianRecipe.cooking_time : mockRecipe?.time?.replace(' min', '');
  
  const servings = indianRecipe?.servings || mockRecipe?.servings || 4;
  
  const imageSrc = indianRecipe 
    ? getRecipeImage(indianRecipe.title, indianRecipe.category, indianRecipe.image_url)
    : getRecipeImage(mockRecipe?.title || "", mockRecipe?.category || "", mockRecipe?.image || "");

  const getDietType = (category: string) => {
    const vegetarianCategories = ['Indian', 'Salads', 'Italian', 'Vegetarian'];
    const dessertCategories = ['Desserts', 'Baking'];
    
    if (vegetarianCategories.includes(category)) {
      return { label: 'Vegetarian', color: 'bg-green-100 text-green-700 border-green-200' };
    } else if (dessertCategories.includes(category)) {
      return { label: 'Dessert', color: 'bg-purple-100 text-purple-700 border-purple-200' };
    } else {
      return { label: 'Non-Vegetarian', color: 'bg-red-100 text-red-700 border-red-200' };
    }
  };

  const dietType = getDietType(recipe.category);

  return (
    <article className="max-w-6xl mx-auto space-y-6 px-4 py-6 md:space-y-8 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2 self-start">
          <ArrowLeft className="h-4 w-4" />
          Back to recipes
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 md:h-5 md:w-5 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
          ))}
          <span className="text-sm font-medium">{rating} ({Math.floor(Math.random() * 500) + 100} reviews)</span>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="font-poppins">{recipe.category}</Badge>
          <Badge variant="outline" className={`font-poppins ${dietType.color}`}>
            {dietType.label}
          </Badge>
          <Badge variant="outline" className="font-poppins">{difficulty} difficulty</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-playfair">{recipe.title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground font-poppins">{recipe.description}</p>
        
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-orange-500" />
            <div>
              <span className="block text-sm font-semibold">Prep Time</span>
              <span className="font-poppins text-sm">{prepTime} mins</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <div>
              <span className="block text-sm font-semibold">Cook Time</span>
              <span className="font-poppins text-sm">{cookTime} mins</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            <div>
              <span className="block text-sm font-semibold">Servings</span>
              <span className="font-poppins text-sm">{servings} servings</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-orange-500" />
            <div>
              <span className="block text-sm font-semibold">Chef</span>
              <span className="font-poppins text-sm">Professional</span>
            </div>
          </div>
        </div>
      </div>

      <div className="aspect-video overflow-hidden rounded-xl shadow-md">
        <img
          src={imageSrc}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <Tabs defaultValue="recipe" className="w-full">
        <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="recipe">Recipe</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="tips">Tips & Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipe" className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Card className="p-4 md:p-6 space-y-4 h-auto">
              <h2 className="text-xl md:text-2xl font-semibold font-playfair flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-500" />
                Ingredients
              </h2>
              <ul className="space-y-2 md:space-y-3">
                {indianRecipe 
                  ? indianRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 font-poppins p-2 hover:bg-orange-50 rounded-md">
                        <div className="h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </li>
                    ))
                  : recipeIngredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 font-poppins p-2 hover:bg-orange-50 rounded-md">
                        <div className="h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                        {ingredient}
                      </li>
                    ))
                }
              </ul>
            </Card>

            <Card className="p-4 md:p-6 space-y-4 h-auto">
              <h2 className="text-xl md:text-2xl font-semibold font-playfair flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-orange-500" />
                Instructions
              </h2>
              <ol className="space-y-3 md:space-y-4">
                {instructionSteps.map((instruction, index) => (
                  <li key={index} className="flex gap-3 md:gap-4 font-poppins group">
                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold group-hover:bg-orange-500 group-hover:text-white transition-colors text-sm md:text-base">
                      {index + 1}
                    </div>
                    <div className="pt-0.5 text-sm md:text-base">
                      {instruction}
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="nutrition" className="space-y-8">
          <Card className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold font-playfair mb-4">Nutrition Facts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {Object.entries(nutritionFacts).map(([key, value]) => (
                <div key={key} className="p-3 md:p-4 border rounded-lg text-center">
                  <p className="text-muted-foreground capitalize text-sm">{key}</p>
                  <p className="text-xl md:text-2xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-xs md:text-sm text-muted-foreground">
              <p>* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="tips" className="space-y-8">
          <Card className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold font-playfair mb-4">Cooking Tips & Notes</h2>
            <ul className="space-y-3">
              {cookingTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 font-poppins p-2 hover:bg-orange-50 rounded-md">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-xs md:text-sm">
                    {index + 1}
                  </div>
                  <div className="pt-0.5 text-sm md:text-base">{tip}</div>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3">
        <Button onClick={handlePrint} variant="outline" className="flex-1 sm:flex-none font-poppins text-xs md:text-sm h-9 md:h-10">
          <Printer className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden xs:inline">Print Recipe</span>
        </Button>
        <Button onClick={handleShare} variant="outline" className="flex-1 sm:flex-none font-poppins text-xs md:text-sm h-9 md:h-10">
          <Share2 className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden xs:inline">Share Recipe</span>
        </Button>
        <Button onClick={handleSaveRecipe} variant="outline" className="flex-1 sm:flex-none font-poppins text-xs md:text-sm h-9 md:h-10">
          <Bookmark className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden xs:inline">Save Recipe</span>
        </Button>
        <Button onClick={handleLike} className="flex-1 sm:flex-none font-poppins bg-orange-500 hover:bg-orange-600 text-xs md:text-sm h-9 md:h-10">
          <Heart className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden xs:inline">Like Recipe</span>
        </Button>
      </div>

      <div className="pt-6 md:pt-8">
        <h2 className="text-xl md:text-2xl font-semibold font-playfair mb-4 md:mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {MOCK_RECIPES.slice(0, 3).map((relatedRecipe) => (
            <Card key={relatedRecipe.id} className="overflow-hidden group cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate(`/recipe/${relatedRecipe.id}`)}>
              <div className="aspect-video overflow-hidden">
                <img
                  src={getRecipeImage(relatedRecipe.title, relatedRecipe.category, relatedRecipe.image)}
                  alt={relatedRecipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 md:p-4">
                <Badge className="mb-2 text-xs">{relatedRecipe.category}</Badge>
                <h3 className="font-bold text-base md:text-lg mb-1 line-clamp-1 group-hover:text-orange-500 transition-colors">
                  {relatedRecipe.title}
                </h3>
                <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
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
