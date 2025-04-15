
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Clock, User, ChefHat, Edit, Trash2, ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  instructions: string;
  cooking_time: number | null;
  difficulty: string | null;
  category: string | null;
  image_url: string | null;
  created_at: string;
  user_id: string;
}

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string | null;
}

interface UserProfile {
  id: string;
  username: string | null;
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [author, setAuthor] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Check current user
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id || null;
        setCurrentUserId(userId);
        
        // Fetch recipe details
        const { data: recipeData, error: recipeError } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", id)
          .single();
        
        if (recipeError) {
          throw new Error("Recipe not found");
        }
        
        setRecipe(recipeData);
        setIsOwner(userId === recipeData.user_id);
        
        // Fetch ingredients
        const { data: ingredientsData, error: ingredientsError } = await supabase
          .from("ingredients")
          .select("*")
          .eq("recipe_id", id);
        
        if (ingredientsError) {
          console.error("Error fetching ingredients:", ingredientsError);
        } else {
          setIngredients(ingredientsData || []);
        }
        
        // Fetch author information
        if (recipeData.user_id) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("id, username")
            .eq("id", recipeData.user_id)
            .single();
          
          if (!profileError && profileData) {
            setAuthor(profileData);
          }
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        toast.error("Failed to load recipe details");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecipeDetails();
  }, [id, navigate]);

  const handleDeleteRecipe = async () => {
    if (!id || !isOwner) return;
    
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("Recipe deleted successfully");
      navigate("/my-recipes");
    } catch (error: any) {
      console.error("Error deleting recipe:", error);
      toast.error("Failed to delete recipe");
    }
  };
  
  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-300/50 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>
      </div>
      
      {/* Recipe header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">{recipe.title}</h1>
          
          {isOwner && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/edit-recipe/${id}`)}
                className="flex items-center"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="flex items-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      recipe and all of its associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteRecipe}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        
        {/* Recipe meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
          {recipe.category && (
            <div className="flex items-center">
              <ChefHat className="mr-1 h-4 w-4" />
              <span>{recipe.category}</span>
            </div>
          )}
          
          {recipe.cooking_time && (
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{recipe.cooking_time} minutes</span>
            </div>
          )}
          
          {recipe.difficulty && (
            <div className="flex items-center">
              <span className={`h-2 w-2 rounded-full mr-1 ${
                recipe.difficulty === "easy" 
                  ? "bg-green-500" 
                  : recipe.difficulty === "medium" 
                  ? "bg-yellow-500" 
                  : "bg-red-500"
              }`}></span>
              <span className="capitalize">{recipe.difficulty} Difficulty</span>
            </div>
          )}
          
          {author && (
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>By {author.username || 'Anonymous User'}</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        {recipe.description && (
          <p className="text-muted-foreground my-4">{recipe.description}</p>
        )}
      </div>
      
      {/* Recipe image */}
      <div className="mb-8 overflow-hidden rounded-lg shadow-md">
        <img 
          src={recipe.image_url || '/placeholder.svg'} 
          alt={recipe.title}
          className="w-full h-auto object-cover max-h-[500px]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ingredients column */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          
          {ingredients.length > 0 ? (
            <ul className="space-y-2">
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className="pb-2 border-b last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium">{ingredient.name}</span>
                    <span>
                      {ingredient.amount} {ingredient.unit}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground italic">No ingredients listed</p>
          )}
        </div>
        
        {/* Instructions column */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {recipe.instructions.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
