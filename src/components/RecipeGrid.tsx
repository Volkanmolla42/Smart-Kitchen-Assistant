import React from "react";
import RecipeCard from "./recipes/RecipeCard";
import { motion } from "framer-motion";

interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  cost: number;
  dietaryTags: string[];
}

interface RecipeGridProps {
  recipes?: Recipe[];
  onAddToList?: (recipeId: string) => void;
  onRecipeClick?: (recipe: Recipe) => void;
}

export const defaultRecipes: Recipe[] = [
  {
    id: "1",
    title: "Vegetarian Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    cookingTime: "25 mins",
    cost: 11.45,
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: [
      "Quinoa (100g)",
      "Sweet Potato (1 medium)",
      "Chickpeas (1 can)",
      "Kale (2 cups)",
      "Avocado (1)",
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
    cost: 13.47,
    dietaryTags: ["Pescatarian", "Keto", "Gluten-Free"],
    ingredients: [
      "Salmon fillet (200g)",
      "Asparagus (1 bunch)",
      "Lemon (1)",
      "Olive oil (2 tbsp)",
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
    title: "Mediterranean Quinoa Salad",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
    cookingTime: "20 mins",
    cost: 9.46,
    dietaryTags: ["Vegan", "Gluten-Free", "Mediterranean"],
    ingredients: [
      "Quinoa (1 cup)",
      "Chickpeas (1 can)",
      "Cucumber (1)",
      "Cherry tomatoes (1 cup)",
      "Red onion (1/2)",
      "Olives (1/2 cup)",
      "Fresh parsley",
    ],
    instructions: [
      "Cook quinoa and let it cool",
      "Dice cucumber, tomatoes, and onion",
      "Drain and rinse chickpeas",
      "Combine all ingredients",
      "Dress with olive oil and lemon juice",
    ],
  },
];

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes = defaultRecipes,
  onAddToList = (recipeId) => console.log(`Add recipe ${recipeId} to list`),
  onRecipeClick = (recipe) => console.log(`Recipe clicked: ${recipe.title}`),
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {recipes.map((recipe) => (
        <motion.div
          key={recipe.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <RecipeCard
            {...recipe}
            onAddToList={() => onAddToList(recipe.id)}
            onClick={() => onRecipeClick(recipe)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeGrid;
