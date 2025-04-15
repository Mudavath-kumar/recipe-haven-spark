
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle, Trash2, ArrowLeft } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const recipeSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  category: z.string().min(1, { message: "Please select a category" }),
  cookingTime: z.number().min(1, { message: "Cooking time must be at least 1 minute" }),
  servings: z.number().min(1, { message: "Servings must be at least 1" }),
  difficulty: z.string().min(1, { message: "Please select a difficulty level" }),
  instructions: z.string().min(20, { message: "Instructions must be detailed" }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }).or(z.string().length(0)),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

type Ingredient = {
  id: string;
  name: string;
  amount: string;
  unit: string;
  dbId?: string; // For existing ingredients from database
};

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      cookingTime: 30,
      servings: 4,
      difficulty: "medium",
      instructions: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (!id) return;
    
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        
        // Check if the user is logged in
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication Required",
            description: "Please login to edit recipes",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        
        // Fetch recipe data
        const { data: recipe, error: recipeError } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", id)
          .single();
        
        if (recipeError) {
          throw recipeError;
        }
        
        // Verify that the user owns this recipe
        if (recipe.user_id !== session.user.id) {
          toast({
            title: "Unauthorized",
            description: "You don't have permission to edit this recipe",
            variant: "destructive",
          });
          navigate("/my-recipes");
          return;
        }
        
        // Fetch ingredients for this recipe
        const { data: ingredientsData, error: ingredientsError } = await supabase
          .from("ingredients")
          .select("*")
          .eq("recipe_id", id);
        
        if (ingredientsError) {
          throw ingredientsError;
        }
        
        // Populate form with recipe data
        form.reset({
          title: recipe.title,
          description: recipe.description || "",
          category: recipe.category || "",
          cookingTime: recipe.cooking_time || 30,
          servings: 4, // Default if not in DB
          difficulty: recipe.difficulty || "medium",
          instructions: recipe.instructions,
          imageUrl: recipe.image_url || "",
        });
        
        // Convert ingredients data to the format expected by the form
        setIngredients(
          ingredientsData.map((ing) => ({
            id: uuidv4(),
            dbId: ing.id,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit || "",
          }))
        );
        
        if (ingredientsData.length === 0) {
          // Add one empty ingredient field if none exist
          setIngredients([{ id: uuidv4(), name: "", amount: "", unit: "" }]);
        }
      } catch (error: any) {
        console.error("Error fetching recipe:", error);
        toast({
          title: "Error",
          description: "Failed to load recipe. " + (error.message || "Please try again."),
          variant: "destructive",
        });
        navigate("/my-recipes");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id, navigate, toast, form]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: uuidv4(), name: "", amount: "", unit: "" },
    ]);
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    }
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string
  ) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const onSubmit = async (values: RecipeFormValues) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    // Validate ingredients
    const validIngredients = ingredients.filter(
      (ing) => ing.name.trim() !== "" && ing.amount.trim() !== ""
    );
    
    if (validIngredients.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one ingredient",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Check for user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to edit a recipe",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      // Update recipe in Supabase
      const { error } = await supabase
        .from("recipes")
        .update({
          title: values.title,
          description: values.description,
          category: values.category,
          cooking_time: values.cookingTime,
          difficulty: values.difficulty,
          instructions: values.instructions,
          image_url: values.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        })
        .eq("id", id);

      if (error) throw error;

      // Get existing ingredients to determine which to update/delete
      const { data: existingIngredients, error: fetchError } = await supabase
        .from("ingredients")
        .select("id")
        .eq("recipe_id", id);

      if (fetchError) throw fetchError;

      const existingIds = existingIngredients.map(ing => ing.id);
      
      // Identify ingredients to be updated, added, or deleted
      const ingredientsToUpdate = validIngredients.filter(ing => ing.dbId);
      const ingredientsToAdd = validIngredients.filter(ing => !ing.dbId);
      
      // Get IDs of ingredients that should be deleted
      const idsToKeep = ingredientsToUpdate.map(ing => ing.dbId);
      const idsToDelete = existingIds.filter(dbId => !idsToKeep.includes(dbId));
      
      // Delete ingredients that are no longer needed
      if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from("ingredients")
          .delete()
          .in("id", idsToDelete);
          
        if (deleteError) throw deleteError;
      }
      
      // Update existing ingredients
      for (const ing of ingredientsToUpdate) {
        const { error: updateError } = await supabase
          .from("ingredients")
          .update({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit || null,
          })
          .eq("id", ing.dbId);
          
        if (updateError) throw updateError;
      }
      
      // Add new ingredients
      if (ingredientsToAdd.length > 0) {
        const ingredientsToInsert = ingredientsToAdd.map((ing) => ({
          recipe_id: id,
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit || null,
        }));

        const { error: insertError } = await supabase
          .from("ingredients")
          .insert(ingredientsToInsert);

        if (insertError) throw insertError;
      }

      toast({
        title: "Recipe Updated",
        description: "Your recipe has been successfully updated",
      });
      
      navigate(`/recipe/${id}`);
    } catch (error: any) {
      console.error("Error updating recipe:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[60vh]">
        <div className="space-y-4 text-center">
          <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-300/50 rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/my-recipes')}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Edit Recipe</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter recipe title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="American">American</SelectItem>
                      <SelectItem value="Thai">Thai</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly describe your recipe"
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="cookingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cooking Time (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servings</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormLabel>Ingredients</FormLabel>
            <div className="space-y-4 mt-2">
              {ingredients.map((ingredient, index) => (
                <div
                  key={ingredient.id}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-5">
                    <Label htmlFor={`ingredient-name-${index}`}>Name</Label>
                    <Input
                      id={`ingredient-name-${index}`}
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "name", e.target.value)
                      }
                      placeholder="e.g. Flour"
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor={`ingredient-amount-${index}`}>Amount</Label>
                    <Input
                      id={`ingredient-amount-${index}`}
                      value={ingredient.amount}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "amount", e.target.value)
                      }
                      placeholder="e.g. 2"
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor={`ingredient-unit-${index}`}>Unit</Label>
                    <Input
                      id={`ingredient-unit-${index}`}
                      value={ingredient.unit}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "unit", e.target.value)
                      }
                      placeholder="e.g. cups"
                    />
                  </div>
                  <div className="col-span-1 pt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(ingredient.id)}
                      className="h-9 w-9"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addIngredient}
                className="mt-2"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Ingredient
              </Button>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Step-by-step instructions for your recipe"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter an image URL for your recipe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/my-recipes')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Recipe"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditRecipe;
