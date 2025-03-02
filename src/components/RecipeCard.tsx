
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

const getPlaceholderImage = (category: string): string => {
  // Use appropriate Unsplash food images based on category
  const placeholders: Record<string, string> = {
    'Indian': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    'Italian': 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    'Chinese': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'Desserts': 'https://images.unsplash.com/photo-1587314168485-3236d6710814',
    'Baking': 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94',
    'Salads': 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
    'Asian': 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a',
    'default': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9'
  };

  return placeholders[category] || placeholders.default;
};

// Helper function to determine diet type based on category
const getDietType = (category: string) => {
  const vegetarianCategories = ['Indian', 'Salads', 'Italian', 'Vegetarian'];
  const dessertCategories = ['Desserts', 'Baking'];
  
  if (vegetarianCategories.includes(category)) {
    return {
      type: 'vegetarian',
      icon: <Salad className="h-4 w-4 text-green-600" />,
      label: 'Vegetarian'
    };
  } else if (dessertCategories.includes(category)) {
    return {
      type: 'dessert',
      icon: <Cake className="h-4 w-4 text-purple-600" />,
      label: 'Dessert'
    };
  } else {
    return {
      type: 'non-vegetarian',
      icon: <Drumstick className="h-4 w-4 text-red-600" />,
      label: 'Non-Vegetarian'
    };
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
  const dietInfo = getDietType(category);
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image || getPlaceholderImage(category)}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = getPlaceholderImage(category);
          }}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Badge className="bg-white/90">{category}</Badge>
          <Badge 
            variant="outline" 
            className={`
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
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description || 'No description available'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{servings} servings</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/recipe/${id}`}>View Recipe</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
