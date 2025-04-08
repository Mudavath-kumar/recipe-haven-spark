import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { collections } from "@/integrations/mongodb/client";
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
import { PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";

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
};

interface AddRecipeProps {
  user: any;
}

const AddRecipe = ({ user }: AddRecipeProps) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: uuidv4(), name: "", amount: "", unit: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    
    // Validate ingredients
    const validIngredients = ingredients.filter(
      (ing) => ing.name.trim() !== "" && ing.amount.trim() !== ""
    );
    
    if (validIngredients.length === 0) {
      toast.error("Please add at least one ingredient");
      setIsSubmitting(false);
      return;
    }

    try {
      if (!user) {
        toast.error("Please login to add a recipe");
        navigate("/login");
        return;
      }

      const recipeId = new ObjectId();
      // Insert recipe to MongoDB
      const recipe = {
        _id: recipeId,
        id: recipeId.toString(),
        title: values.title,
        description: values.description,
        category: values.category,
        cooking_time: values.cookingTime,
        difficulty: values.difficulty,
        instructions: values.instructions,
        image_url: values.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        user_id: user.id,
        created_at: new Date()
      };
      
      await collections.recipes.insertOne(recipe);

      // Insert ingredients
      const ingredientsToInsert = validIngredients.map((ing) => ({
        _id: new ObjectId(),
        id: new ObjectId().toString(),
        recipe_id: recipe.id,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit || null,
      }));

      if (ingredientsToInsert.length > 0) {
        await collections.ingredients.insertMany(ingredientsToInsert);
      }

      toast.success("Recipe added successfully!");
      
      navigate(`/recipe/${recipe.id}`);
    } catch (error: any) {
      console.error("Error adding recipe:", error);
      toast.error(error.message || "Failed to add recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
      
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
          
          <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Recipe"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddRecipe;
