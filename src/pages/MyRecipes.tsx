
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Edit, Trash2, Plus, Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  cooking_time: number | null;
  difficulty: string | null;
  image_url: string | null;
  created_at: string;
}

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }
      
      // Fetch recipes for this user
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setRecipes(data || []);
    } catch (error: any) {
      console.error('Error fetching recipes:', error);
      toast.error('Failed to load your recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async () => {
    if (!recipeToDelete) return;
    
    try {
      // Delete recipe
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeToDelete);
      
      if (error) throw error;
      
      // Update local state
      setRecipes(recipes.filter(recipe => recipe.id !== recipeToDelete));
      toast.success('Recipe deleted successfully');
    } catch (error: any) {
      console.error('Error deleting recipe:', error);
      toast.error('Failed to delete recipe');
    } finally {
      setRecipeToDelete(null);
    }
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (recipe.category && recipe.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getDifficultyColor = (difficulty: string | null) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Recipes</h1>
          <p className="text-muted-foreground mt-1">Manage all your created recipes</p>
        </div>
        <Button onClick={() => navigate('/add-recipe')} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add New Recipe</span>
        </Button>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search your recipes..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-64 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden h-full flex flex-col">
              <div className="h-40 relative overflow-hidden">
                <img
                  src={recipe.image_url || '/placeholder.svg'}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {recipe.difficulty && (
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                    </span>
                  )}
                  {recipe.cooking_time && (
                    <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                      {recipe.cooking_time} min
                    </span>
                  )}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1">{recipe.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {recipe.description || 'No description available'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">
                    {recipe.category || 'Uncategorized'}
                  </span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(recipe.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="mt-auto pt-2">
                <div className="flex justify-between w-full">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/recipe/${recipe.id}`} className="flex items-center gap-1">
                      <Eye size={14} /> View
                    </Link>
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/edit-recipe/${recipe.id}`} className="flex items-center gap-1">
                        <Edit size={14} /> Edit
                      </Link>
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => setRecipeToDelete(recipe.id)}
                        >
                          <Trash2 size={14} /> Delete
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
                          <AlertDialogCancel onClick={() => setRecipeToDelete(null)}>Cancel</AlertDialogCancel>
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
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-muted mb-4">
            <SearchIcon className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium">No recipes found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {recipes.length === 0
              ? "You haven't created any recipes yet. Add your first recipe to get started!"
              : "No recipes match your search criteria. Try a different search term."}
          </p>
          {recipes.length === 0 && (
            <Button 
              onClick={() => navigate('/add-recipe')} 
              className="mt-4"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create your first recipe
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default MyRecipes;
