import React from "react";
import RecipeCard from "./RecipeCard";

interface Recipe {
  id: string;
  title: string;
  image: string;
  cookingTime: string;
  cost: number;
  dietaryTags: string[];
  ingredients: { name: string; amount: string }[];
  instructions: string[];
}

interface RecipeGridProps {
  recipes?: Recipe[];
  onAddToList?: (recipeId: string) => void;
  onRecipeClick?: (recipe: Recipe) => void;
}

// Calculate recipe cost based on ingredients
const calculateRecipeCost = (ingredients: { name: string }[]) => {
  const priceMap = {
    Quinoa: 3.99,
    "Sweet Potato": 0.99,
    Chickpeas: 1.49,
    Kale: 2.99,
    Avocado: 1.99,
    "Salmon fillet": 8.99,
    Asparagus: 2.99,
    Lemon: 0.5,
    "Olive oil": 0.99,
    Cucumber: 0.99,
    "Cherry tomatoes": 2.99,
    Pasta: 1.99,
    Olives: 2.49,
    "Feta cheese": 3.99,
  };

  return ingredients.reduce((total, ingredient) => {
    return total + (priceMap[ingredient.name] || 1.99);
  }, 0);
};

export const defaultRecipes: Recipe[] = [
  {
    id: "1",
    title: "Vegetarian Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    cookingTime: "25 mins",
    cost: 11.45, // Quinoa + Sweet Potato + Chickpeas + Kale + Avocado
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: [
      { name: "Quinoa", amount: "100g" },
      { name: "Sweet Potato", amount: "1 medium" },
      { name: "Chickpeas", amount: "1 can" },
      { name: "Kale", amount: "2 cups" },
      { name: "Avocado", amount: "1" },
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Roast sweet potato and chickpeas with spices",
      "Massage kale with olive oil",
      "Assemble bowl with all ingredients",
      "Top with sliced avocado and dressing",
    ],
  },
  {
    id: "2",
    title: "Grilled Salmon with Asparagus",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    cookingTime: "35 mins",
    cost: 13.47, // Salmon + Asparagus + Lemon + Olive oil
    dietaryTags: ["Pescatarian", "Keto"],
    ingredients: [
      { name: "Salmon fillet", amount: "200g" },
      { name: "Asparagus", amount: "1 bunch" },
      { name: "Lemon", amount: "1" },
      { name: "Olive oil", amount: "2 tbsp" },
    ],
    instructions: [
      "Preheat grill to medium-high heat",
      "Season salmon with salt and pepper",
      "Grill salmon for 4-5 minutes per side",
      "Grill asparagus until tender",
      "Serve with lemon wedges",
    ],
  },
  {
    id: "3",
    title: "Quinoa Chickpea Salad",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
    cookingTime: "20 mins",
    cost: 9.46, // Quinoa + Chickpeas + Cucumber + Cherry tomatoes
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: [
      { name: "Quinoa", amount: "1 cup" },
      { name: "Chickpeas", amount: "1 can" },
      { name: "Cucumber", amount: "1" },
      { name: "Cherry tomatoes", amount: "1 cup" },
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Drain and rinse chickpeas",
      "Dice cucumber and halve tomatoes",
      "Mix all ingredients with dressing",
      "Season to taste",
    ],
  },
  {
    id: "4",
    title: "Mediterranean Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    cookingTime: "30 mins",
    cost: 11.46, // Pasta + Cherry tomatoes + Olives + Feta cheese
    dietaryTags: ["Vegetarian"],
    ingredients: [
      { name: "Pasta", amount: "500g" },
      { name: "Cherry tomatoes", amount: "2 cups" },
      { name: "Olives", amount: "1/2 cup" },
      { name: "Feta cheese", amount: "200g" },
    ],
    instructions: [
      "Cook pasta al dente",
      "Halve tomatoes and olives",
      "Crumble feta cheese",
      "Mix all ingredients",
      "Drizzle with olive oil",
    ],
  },
];

const RecipeGrid = ({
  recipes = defaultRecipes,
  onAddToList = (recipeId) => console.log(`Add recipe ${recipeId} to list`),
  onRecipeClick = (recipe) => console.log(`Recipe clicked: ${recipe.title}`),
}: RecipeGridProps) => {
  return (
    <div className="w-full min-h-[600px] bg-gray-50 p-8">
      {recipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No recipes found. Try adding more ingredients or adjusting your
            preferences.
          </p>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              cookingTime={recipe.cookingTime}
              cost={recipe.cost}
              dietaryTags={recipe.dietaryTags}
              onAddToList={() => onAddToList(recipe.id)}
              onClick={() => onRecipeClick(recipe)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeGrid;
