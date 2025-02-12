const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export interface ApiRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  pricePerServing: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  extendedIngredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    originalName: string;
  }[];
  analyzedInstructions: {
    steps: {
      number: number;
      step: string;
    }[];
  }[];
}

export const searchRecipes = async (
  ingredients: string[],
  preferences: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    budget: number;
  },
) => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      includeIngredients: ingredients.join(","),
      number: "8",
      addRecipeInformation: "true",
      fillIngredients: "true",
      instructionsRequired: "true",
      ...(preferences.isVegetarian && { diet: "vegetarian" }),
      ...(preferences.isVegan && { diet: "vegan" }),
      ...(preferences.isGlutenFree && { intolerances: "gluten" }),
      maxReadyTime: "60",
    });

    const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
    const data = await response.json();

    return data.results.map((recipe: ApiRecipe) => ({
      id: recipe.id.toString(),
      title: recipe.title,
      image: recipe.image,
      cookingTime: `${recipe.readyInMinutes} mins`,
      cost: recipe.pricePerServing,
      dietaryTags: [
        ...(recipe.vegetarian ? ["Vegetarian"] : []),
        ...(recipe.vegan ? ["Vegan"] : []),
        ...(recipe.glutenFree ? ["Gluten-Free"] : []),
      ],
      ingredients: recipe.extendedIngredients.map((ing) => ({
        name: ing.originalName,
        amount: `${ing.amount} ${ing.unit}`,
      })),
      instructions:
        recipe.analyzedInstructions[0]?.steps.map((step) => step.step) || [],
    }));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
