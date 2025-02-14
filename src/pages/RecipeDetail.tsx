
import { useParams } from "react-router-dom";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Clock, Printer, Share2, Users, Plus, Heart, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const RecipeDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const recipe = MOCK_RECIPES.find((r) => r.id === Number(id));

  const handleShare = async () => {
    try {
      await navigator.share({
        title: recipe?.title,
        text: recipe?.description,
        url: window.location.href,
      });
    } catch (err) {
      toast({
        title: "Copied to clipboard!",
        description: "Recipe link has been copied to your clipboard.",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleSaveRecipe = () => {
    toast({
      title: "Recipe saved!",
      description: "This recipe has been saved to your collection.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-muted-foreground">Recipe not found</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto space-y-8 px-4 py-8">
      <div className="space-y-4">
        <Badge className="font-poppins">{recipe.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight font-playfair">{recipe.title}</h1>
        <p className="text-xl text-muted-foreground font-poppins">{recipe.description}</p>
        
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="font-poppins">{recipe.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span className="font-poppins">{recipe.servings} servings</span>
          </div>
        </div>
      </div>

      <div className="aspect-video overflow-hidden rounded-xl">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold font-playfair">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-2 font-poppins">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                {ingredient}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold font-playfair">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions?.map((instruction, index) => (
              <li key={index} className="flex gap-4 font-poppins">
                <span className="font-semibold text-primary">{index + 1}.</span>
                {instruction}
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Separator />

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
        <Button className="flex-1 sm:flex-none font-poppins">
          <Heart className="mr-2 h-4 w-4" />
          Like Recipe
        </Button>
      </div>
    </article>
  );
};

export default RecipeDetail;
