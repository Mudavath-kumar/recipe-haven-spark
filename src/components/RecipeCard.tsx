
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";

interface RecipeCardProps {
  id: string | number; // Updated to accept both string (UUID) and number
  title: string;
  description: string;
  image: string;
  time: string;
  servings: number;
  category: string;
}

export const RecipeCard = ({
  id,
  title,
  description,
  image,
  time,
  servings,
  category,
}: RecipeCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <Badge className="absolute top-2 right-2 bg-white/90">{category}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description || 'No description available'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
