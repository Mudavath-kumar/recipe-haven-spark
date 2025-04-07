
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, Users, Salad, Drumstick, Cake, Heart } from "lucide-react";
import { getRecipeImage } from "@/lib/imageUtils";
import { useState } from "react";

interface EnhancedRecipeCardProps {
  id: string | number;
  title: string;
  description: string;
  image: string;
  time: string;
  servings: number;
  category: string;
  featured?: boolean;
}

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

export const EnhancedRecipeCard = ({
  id,
  title,
  description,
  image,
  time,
  servings,
  category,
  featured = false,
}: EnhancedRecipeCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  
  // Get diet type function based on category
  const getDietTypeForTitle = getDietType(category);
  // Get diet info for this specific recipe
  const dietInfo = getDietTypeForTitle(title);
  
  // Attempt to get the correct image or fallback to a category image
  const displayImage = getRecipeImage(title, category, image);
  
  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-recipe-900/30 h-full flex flex-col ${
      featured ? 'border-recipe-300 dark:border-recipe-700 shadow-md' : ''
    }`}>
      <div className="relative aspect-video overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            // If the image fails to load, try with a category default
            e.currentTarget.src = getRecipeImage("", category, "");
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 z-10"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
        </button>
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-white/90 dark:bg-black/60 text-xs font-medium text-recipe-900 dark:text-recipe-300 border-transparent">
            {category}
          </Badge>
          <Badge 
            variant="outline" 
            className={`
              text-xs font-medium
              ${dietInfo.type === 'vegetarian' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 
                dietInfo.type === 'dessert' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' : 
                'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'}
            `}
          >
            <span className="flex items-center gap-1">
              {dietInfo.icon}
              {dietInfo.label}
            </span>
          </Badge>
          {featured && (
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-transparent">
              Featured
            </Badge>
          )}
        </div>
      </div>
      <CardHeader className="flex-grow p-4 pb-2">
        <CardTitle className="line-clamp-1 text-base md:text-lg font-bold group-hover:text-recipe-700 dark:group-hover:text-recipe-400 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs md:text-sm mt-1 text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-recipe-600 dark:text-recipe-400" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 md:h-4 md:w-4 text-recipe-600 dark:text-recipe-400" />
            <span>{servings} {servings === 1 ? 'serving' : 'servings'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild className="w-full text-xs md:text-sm h-9 bg-recipe-700 hover:bg-recipe-800 dark:bg-recipe-600 dark:hover:bg-recipe-700 transition-colors">
          <Link to={`/recipe/${id}`}>View Recipe</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
