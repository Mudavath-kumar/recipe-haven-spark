
import { useParams } from "react-router-dom";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Clock, Printer, Share2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = MOCK_RECIPES.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-muted-foreground">Recipe not found</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <Badge>{recipe.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight">{recipe.title}</h1>
        <p className="text-xl text-muted-foreground">{recipe.description}</p>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>

      <div className="aspect-video overflow-hidden rounded-lg">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="w-full">
          <Printer className="mr-2 h-4 w-4" />
          Print Recipe
        </Button>
        <Button variant="outline" className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Share Recipe
        </Button>
      </div>
    </article>
  );
};

export default RecipeDetail;
