const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY; // .env dosyasına taşınacak
const BASE_URL = 'https://api.spoonacular.com/recipes';

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  pricePerServing: number;
  diets: string[];
  extendedIngredients: {
    original: string;
  }[];
  analyzedInstructions: {
    steps: {
      step: string;
    }[];
  }[];
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  cost: number;
  dietaryTags: string[];
}

export const getRandomRecipes = async (number: number = 3): Promise<Recipe[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/random?apiKey=${API_KEY}&number=${number}`
    );
    const data = await response.json();

    return data.recipes.map((recipe: SpoonacularRecipe) => ({
      id: recipe.id.toString(),
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.extendedIngredients.map(ing => ing.original),
      instructions: recipe.analyzedInstructions[0]?.steps.map(step => step.step) || [],
      cookingTime: `${recipe.readyInMinutes} mins`,
      cost: Math.round(recipe.pricePerServing / 100), // Convert cents to dollars and round
      dietaryTags: recipe.diets
    }));
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
};
