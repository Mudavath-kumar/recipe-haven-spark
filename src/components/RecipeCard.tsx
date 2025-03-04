
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, Users, Salad, Drumstick, Cake } from "lucide-react";

interface RecipeCardProps {
  id: string | number;
  title: string;
  description: string;
  image: string;
  time: string;
  servings: number;
  category: string;
}

// Enhanced function to get appropriate image based on dish title and category
const getRecipeImage = (title: string, category: string, providedImage: string): string => {
  // If a specific image URL is provided and it's valid, use it
  if (providedImage && !providedImage.includes("undefined") && providedImage.startsWith("http")) {
    return providedImage;
  }
  
  // Map specific dishes to specific images for accuracy
  const dishSpecificImages: Record<string, string> = {
    // Indian dishes
    "Butter Chicken": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
    "Chicken Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
    "Tandoori Chicken": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
    "Paneer Tikka": "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    "Palak Paneer": "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    "Chole Bhature": "https://images.unsplash.com/photo-1626132647957-5659d0bc9222",
    "Dal Makhani": "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    "Masala Dosa": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
    "Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
    
    // Italian dishes
    "Classic Margherita Pizza": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    "Mushroom Risotto": "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
    "Vegetable Lasagna": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0",
    "Chicken Alfredo Pasta": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
    
    // Desserts
    "Chocolate Chip Cookies": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    "Banana Bread": "https://images.unsplash.com/photo-1584736286279-4a5f6e2b0858",
    "Tiramisu": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
    "Red Velvet Cake": "https://images.unsplash.com/photo-1586788680434-30d324626f14",
    "Mango Sticky Rice": "https://images.unsplash.com/photo-1565538810643-b5bdb714032a",
    
    // Salads
    "Greek Salad": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    "Caesar Salad": "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    
    // Asian dishes
    "Beef Stir Fry": "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    "Thai Green Curry with Chicken": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
    "Spicy Tuna Sushi Roll": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    
    // Vegetarian
    "Vegetable Curry": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd"
  };

  // If we have a specific image for this dish, use it
  if (dishSpecificImages[title]) {
    return dishSpecificImages[title];
  }
  
  // Fallback to category-based images
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

// Helper function to determine diet type based on category
const getDietType = (category: string) => {
  const vegetarianCategories = ['Indian', 'Salads', 'Italian', 'Vegetarian'];
  const dessertCategories = ['Desserts', 'Baking'];
  
  // For Indian recipes, check the title to determine if it's vegetarian
  if (category === 'Indian') {
    const nonVegIndianDishes = [
      'Butter Chicken', 'Chicken Biryani', 'Tandoori Chicken', 'Biryani', 
      'Chicken Curry', 'Chicken Tikka', 'Fish Curry', 'Mutton'
    ];
    return (title: string) => {
      if (nonVegIndianDishes.some(dish => title.includes(dish))) {
        return {
          type: 'non-vegetarian',
          icon: <Drumstick className="h-4 w-4 text-red-600" />,
          label: 'Non-Vegetarian'
        };
      } else {
        return {
          type: 'vegetarian',
          icon: <Salad className="h-4 w-4 text-green-600" />,
          label: 'Vegetarian'
        };
      }
    };
  }
  
  if (vegetarianCategories.includes(category)) {
    return () => ({
      type: 'vegetarian',
      icon: <Salad className="h-4 w-4 text-green-600" />,
      label: 'Vegetarian'
    });
  } else if (dessertCategories.includes(category)) {
    return () => ({
      type: 'dessert',
      icon: <Cake className="h-4 w-4 text-purple-600" />,
      label: 'Dessert'
    });
  } else {
    return () => ({
      type: 'non-vegetarian',
      icon: <Drumstick className="h-4 w-4 text-red-600" />,
      label: 'Non-Vegetarian'
    });
  }
};

export const RecipeCard = ({
  id,
  title,
  description,
  image,
  time,
  servings,
  category,
}: RecipeCardProps) => {
  // Get diet type function based on category
  const getDietTypeForTitle = getDietType(category);
  // Get diet info for this specific recipe
  const dietInfo = getDietTypeForTitle(title);
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={getRecipeImage(title, category, image)}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = getRecipeImage(title, category, "");
          }}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Badge className="bg-white/90 text-xs">{category}</Badge>
          <Badge 
            variant="outline" 
            className={`
              text-xs
              ${dietInfo.type === 'vegetarian' ? 'bg-green-50 text-green-700 border-green-200' : 
                dietInfo.type === 'dessert' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                'bg-red-50 text-red-700 border-red-200'}
            `}
          >
            <span className="flex items-center gap-1">
              {dietInfo.icon}
              {dietInfo.label}
            </span>
          </Badge>
        </div>
      </div>
      <CardHeader className="flex-grow p-3 md:p-4 lg:p-6">
        <CardTitle className="line-clamp-1 text-base md:text-lg lg:text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs md:text-sm mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0 md:p-4 md:pt-0 lg:p-6 lg:pt-0">
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 md:h-4 md:w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 md:h-4 md:w-4" />
            <span>{servings} {servings === 1 ? 'serving' : 'servings'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 md:p-4 md:pt-0 lg:p-6 lg:pt-0 mt-auto">
        <Button asChild className="w-full text-xs md:text-sm h-8 md:h-9 lg:h-10">
          <Link to={`/recipe/${id}`}>View Recipe</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
