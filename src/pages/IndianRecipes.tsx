
import { RecipeCard } from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  cooking_time: number | null;
  category: string;
}

const fetchIndianRecipes = async (): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('category', 'Indian');
  
  if (error) {
    console.error('Error fetching Indian recipes:', error);
    throw error;
  }
  
  // Transform the data to include the category
  const recipes = (data || []).map(recipe => ({
    ...recipe,
    category: 'Indian' // Add the category field explicitly
  })) as Recipe[];
  
  return recipes;
};

const IndianRecipes = () => {
  const { data: indianRecipes, isLoading } = useQuery({
    queryKey: ['recipes', 'indian'],
    queryFn: fetchIndianRecipes
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Indian Cuisine</h1>
          <p className="text-muted-foreground">
            Explore the rich flavors and spices of traditional Indian recipes
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(indianRecipes || []).map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              id={parseInt(recipe.id, 10) || 0}  // Convert string ID to number
              title={recipe.title}
              description={recipe.description || ''}
              image={recipe.image_url || '/placeholder.svg'}
              time={`${recipe.cooking_time || 0} mins`}
              servings={4}
              category="Indian"
            />
          ))}
          {(!indianRecipes || indianRecipes.length === 0) && (
            <p className="col-span-full text-center text-muted-foreground">
              No Indian recipes found. Be the first to add one!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default IndianRecipes;
