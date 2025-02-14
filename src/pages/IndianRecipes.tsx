
import { RecipeCard } from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const IndianRecipes = () => {
  const { data: indianRecipes, isLoading } = useQuery({
    queryKey: ['recipes', 'indian'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('category', 'Indian');
      
      if (error) {
        console.error('Error fetching Indian recipes:', error);
        throw error;
      }
      
      return data;
    }
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
          {indianRecipes?.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              id={recipe.id} 
              title={recipe.title}
              description={recipe.description || ''}
              image={recipe.image_url || '/placeholder.svg'}
              time={`${recipe.cooking_time || 0} mins`}
              servings={4} // This should come from the database, for now using a default
              category="Indian"
            />
          ))}
          {indianRecipes?.length === 0 && (
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
