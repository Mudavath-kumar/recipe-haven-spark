
import { RecipeCard } from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/integrations/supabase/types";

type DbRecipe = Database['public']['Tables']['recipes']['Row'];

// Mock data for the Indian recipes
const INDIAN_RECIPES = [
  {
    id: "ind-1",
    title: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce with butter and aromatic spices.",
    image_url: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&auto=format&fit=crop&w=896&q=80",
    cooking_time: 45,
    category: "Indian",
    instructions: "Marinate chicken with yogurt and spices. Grill until charred. Prepare the sauce with butter, tomatoes, cream, and garam masala. Combine chicken and sauce, simmer until done.",
    ingredients: [
      { name: "Chicken", amount: "500g", unit: "grams" },
      { name: "Butter", amount: "50g", unit: "grams" },
      { name: "Tomato paste", amount: "2", unit: "tablespoons" },
      { name: "Heavy cream", amount: "1/2", unit: "cup" },
      { name: "Garam masala", amount: "1", unit: "tablespoon" },
      { name: "Garlic", amount: "4", unit: "cloves" },
      { name: "Ginger", amount: "1", unit: "inch" },
      { name: "Fenugreek leaves", amount: "1", unit: "teaspoon" }
    ]
  },
  {
    id: "ind-2",
    title: "Chicken Biryani",
    description: "Fragrant basmati rice with spiced chicken, caramelized onions, and aromatic spices.",
    image_url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1297&q=80",
    cooking_time: 60,
    category: "Indian",
    instructions: "Marinate chicken with yogurt and spices. Cook rice with whole spices until partially done. Layer chicken and rice, dum cook until fully cooked.",
    ingredients: [
      { name: "Basmati rice", amount: "2", unit: "cups" },
      { name: "Chicken", amount: "500g", unit: "grams" },
      { name: "Yogurt", amount: "1/2", unit: "cup" },
      { name: "Onions", amount: "2", unit: "large" },
      { name: "Saffron", amount: "1", unit: "pinch" },
      { name: "Garam masala", amount: "1", unit: "tablespoon" },
      { name: "Mint leaves", amount: "1/4", unit: "cup" },
      { name: "Coriander leaves", amount: "1/4", unit: "cup" }
    ]
  },
  {
    id: "ind-3",
    title: "Palak Paneer",
    description: "Cottage cheese cubes in a smooth, creamy spinach sauce spiced to perfection.",
    image_url: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=896&q=80",
    cooking_time: 40,
    category: "Indian",
    instructions: "Blanch spinach and puree. Sauté onions, garlic, and spices. Add spinach puree and simmer. Add fried paneer, cream, and finish with garam masala.",
    ingredients: [
      { name: "Spinach", amount: "500g", unit: "grams" },
      { name: "Paneer", amount: "200g", unit: "grams" },
      { name: "Onion", amount: "1", unit: "medium" },
      { name: "Ginger-garlic paste", amount: "2", unit: "tablespoons" },
      { name: "Green chilies", amount: "2", unit: "" },
      { name: "Cream", amount: "2", unit: "tablespoons" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" },
      { name: "Cumin seeds", amount: "1", unit: "teaspoon" }
    ]
  },
  {
    id: "ind-4",
    title: "Chole Bhature",
    description: "Spicy chickpea curry served with deep-fried bread, a popular Punjabi delicacy.",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    cooking_time: 50,
    category: "Indian",
    instructions: "Soak chickpeas overnight. Pressure cook with spices. Prepare bhature dough and let it ferment. Deep fry bhature and serve with chickpea curry.",
    ingredients: [
      { name: "Chickpeas", amount: "2", unit: "cups" },
      { name: "All-purpose flour", amount: "2", unit: "cups" },
      { name: "Onion", amount: "1", unit: "large" },
      { name: "Tomatoes", amount: "2", unit: "medium" },
      { name: "Ginger", amount: "1", unit: "inch" },
      { name: "Garlic", amount: "4", unit: "cloves" },
      { name: "Chole masala", amount: "2", unit: "tablespoons" },
      { name: "Oil", amount: "for frying", unit: "" }
    ]
  },
  {
    id: "ind-5",
    title: "Masala Dosa",
    description: "Crispy fermented rice crepe filled with spiced potato filling, a South Indian favorite.",
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1297&q=80",
    cooking_time: 40,
    category: "Indian",
    instructions: "Prepare batter by soaking rice and lentils, grind, and ferment. Make potato filling with mustard seeds, onions, and spices. Spread batter on hot griddle, add filling, and fold.",
    ingredients: [
      { name: "Rice", amount: "3", unit: "cups" },
      { name: "Urad dal", amount: "1", unit: "cup" },
      { name: "Potatoes", amount: "4", unit: "medium" },
      { name: "Onion", amount: "1", unit: "large" },
      { name: "Mustard seeds", amount: "1", unit: "teaspoon" },
      { name: "Turmeric powder", amount: "1/2", unit: "teaspoon" },
      { name: "Curry leaves", amount: "10", unit: "" },
      { name: "Green chilies", amount: "3", unit: "" }
    ]
  },
  {
    id: "ind-6",
    title: "Tandoori Chicken",
    description: "Chicken marinated in yogurt and spices, then roasted to perfection in a tandoor.",
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    cooking_time: 50,
    category: "Indian",
    instructions: "Make cuts in chicken pieces. Marinate with yogurt, spices, and lemon juice. Let it sit for hours. Roast in a hot oven until cooked through.",
    ingredients: [
      { name: "Chicken", amount: "1", unit: "whole" },
      { name: "Yogurt", amount: "1", unit: "cup" },
      { name: "Lemon juice", amount: "2", unit: "tablespoons" },
      { name: "Ginger-garlic paste", amount: "3", unit: "tablespoons" },
      { name: "Red chili powder", amount: "1", unit: "tablespoon" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" },
      { name: "Tandoori masala", amount: "2", unit: "tablespoons" },
      { name: "Oil", amount: "2", unit: "tablespoons" }
    ]
  },
  {
    id: "ind-7",
    title: "Malai Kofta",
    description: "Soft paneer and potato dumplings served in a rich, creamy tomato-based gravy.",
    image_url: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=1297&q=80",
    cooking_time: 60,
    category: "Indian",
    instructions: "Make koftas with paneer, potatoes, and spices, deep fry. Prepare creamy gravy with cashews, tomatoes, and cream. Add koftas just before serving.",
    ingredients: [
      { name: "Paneer", amount: "200g", unit: "grams" },
      { name: "Potatoes", amount: "2", unit: "medium" },
      { name: "Cashew nuts", amount: "15", unit: "" },
      { name: "Cream", amount: "1/4", unit: "cup" },
      { name: "Tomatoes", amount: "3", unit: "medium" },
      { name: "Onion", amount: "1", unit: "large" },
      { name: "Kasuri methi", amount: "1", unit: "tablespoon" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" }
    ]
  },
  {
    id: "ind-8",
    title: "Aloo Gobi",
    description: "A dry curry dish made with potatoes, cauliflower, and Indian spices.",
    image_url: "https://images.unsplash.com/photo-1577859714523-5f0b6c98afa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1297&q=80",
    cooking_time: 30,
    category: "Indian",
    instructions: "Heat oil, add cumin seeds. Add potatoes and cauliflower. Add spices and stir-fry until vegetables are tender and well-coated with spices.",
    ingredients: [
      { name: "Potatoes", amount: "3", unit: "medium" },
      { name: "Cauliflower", amount: "1", unit: "medium" },
      { name: "Cumin seeds", amount: "1", unit: "teaspoon" },
      { name: "Turmeric powder", amount: "1/2", unit: "teaspoon" },
      { name: "Red chili powder", amount: "1", unit: "teaspoon" },
      { name: "Garam masala", amount: "1/2", unit: "teaspoon" },
      { name: "Coriander leaves", amount: "2", unit: "tablespoons" },
      { name: "Oil", amount: "2", unit: "tablespoons" }
    ]
  },
  {
    id: "ind-9",
    title: "Rogan Josh",
    description: "A Kashmiri curry dish made with aromatic spices and tender pieces of lamb or mutton.",
    image_url: "https://images.unsplash.com/photo-1545247181-516773cae754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    cooking_time: 90,
    category: "Indian",
    instructions: "Brown meat with whole spices. Add onions, ginger, and garlic. Add Kashmiri red chili, yogurt, and spices. Slow cook until meat is tender.",
    ingredients: [
      { name: "Lamb/Mutton", amount: "500g", unit: "grams" },
      { name: "Yogurt", amount: "1", unit: "cup" },
      { name: "Kashmiri red chili", amount: "4", unit: "tablespoons" },
      { name: "Fennel powder", amount: "1", unit: "tablespoon" },
      { name: "Ginger", amount: "2", unit: "inches" },
      { name: "Garlic", amount: "8", unit: "cloves" },
      { name: "Bay leaves", amount: "2", unit: "" },
      { name: "Cardamom pods", amount: "5", unit: "" }
    ]
  },
  {
    id: "ind-10",
    title: "Samosas",
    description: "Crispy pastry filled with spiced potatoes, peas, and sometimes meat, a popular snack.",
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=896&q=80",
    cooking_time: 60,
    category: "Indian",
    instructions: "Prepare dough with flour and oil. Rest. Make filling with potatoes, peas, and spices. Form into triangles and deep fry until golden brown.",
    ingredients: [
      { name: "All-purpose flour", amount: "2", unit: "cups" },
      { name: "Potatoes", amount: "4", unit: "medium" },
      { name: "Green peas", amount: "1/2", unit: "cup" },
      { name: "Cumin seeds", amount: "1", unit: "teaspoon" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" },
      { name: "Coriander powder", amount: "1", unit: "tablespoon" },
      { name: "Green chilies", amount: "2", unit: "" },
      { name: "Oil", amount: "for frying", unit: "" }
    ]
  }
];

const fetchIndianRecipes = async (): Promise<DbRecipe[]> => {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('category', 'Indian');
    
    if (error) {
      console.error('Error fetching Indian recipes from Supabase:', error);
      throw error;
    }
    
    // If no data returned from Supabase, use mock data
    return data && data.length > 0 ? data : INDIAN_RECIPES as unknown as DbRecipe[];
  } catch (error) {
    console.error('Error in fetchIndianRecipes:', error);
    // Return mock data as fallback
    return INDIAN_RECIPES as unknown as DbRecipe[];
  }
};

const IndianRecipes = () => {
  const { data: indianRecipes, isLoading } = useQuery<DbRecipe[], Error>({
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
              id={recipe.id}
              title={recipe.title}
              description={recipe.description || 'No description available'}
              image={recipe.image_url || '/placeholder.svg'}
              time={`${recipe.cooking_time || 30} mins`}
              servings={4}
              category={recipe.category || 'Indian'}
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
