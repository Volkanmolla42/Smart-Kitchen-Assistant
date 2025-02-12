import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import IngredientSearch from "./IngredientSearch";
import PreferencesPanel from "./PreferencesPanel";
import RecipeGrid from "./RecipeGrid";
import ShoppingListSidebar from "./ShoppingListSidebar";
import { Button } from "./ui/button";
import { ShoppingBasket } from "lucide-react";
import RecipeDetailModal from "./RecipeDetailModal";
import { searchRecipes } from "@/lib/api";

interface HomeProps {
  onSearch?: () => void;
}

const Home = ({
  onSearch = () => console.log("Search clicked"),
}: HomeProps) => {
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [preferences, setPreferences] = useState({
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    budget: 50,
  });

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [shoppingList, setShoppingList] = useState([
    { id: "1", name: "Pasta", quantity: 2, price: 2.99 },
    { id: "2", name: "Tomatoes", quantity: 4, price: 0.99 },
    { id: "3", name: "Basil", quantity: 1, price: 1.5 },
  ]);

  const handleIngredientAdd = (ingredient: { id: string; name: string }) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleIngredientRemove = (id: string) => {
    setSelectedIngredients(selectedIngredients.filter((ing) => ing.id !== id));
  };

  const fetchRecipes = async (
    ingredients: { name: string }[],
    prefs: typeof preferences,
  ) => {
    if (ingredients.length === 0) return;

    setIsLoading(true);
    try {
      const recipeData = await searchRecipes(
        ingredients.map((i) => i.name),
        prefs,
      );
      setRecipes(recipeData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(selectedIngredients, preferences);
  }, [selectedIngredients]);

  const handlePreferencesChange = (newPreferences: typeof preferences) => {
    setPreferences(newPreferences);
    fetchRecipes(selectedIngredients, newPreferences);
  };

  const handleAddToShoppingList = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return;

    const newItems = recipe.ingredients.map((ingredient) => ({
      id: `${recipeId}-${ingredient.name}`,
      name: ingredient.name,
      quantity: 1,
      // Calculate price based on ingredient
      price: (() => {
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
          // Default price for unknown ingredients
          default: 1.99,
        };
        return priceMap[ingredient.name] || priceMap.default;
      })(),
    }));

    // Merge with existing items, combining quantities for same ingredients
    const updatedList = [...shoppingList];
    newItems.forEach((newItem) => {
      const existingItem = updatedList.find(
        (item) => item.name === newItem.name,
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        updatedList.push(newItem);
      }
    });

    setShoppingList(updatedList);
    setIsShoppingListOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection onSearch={onSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center space-y-8">
          <IngredientSearch
            selectedIngredients={selectedIngredients}
            onIngredientAdd={handleIngredientAdd}
            onIngredientRemove={handleIngredientRemove}
          />

          <PreferencesPanel
            defaultPreferences={preferences}
            onPreferencesChange={handlePreferencesChange}
          />
        </div>

        <RecipeGrid
          recipes={recipes}
          onAddToList={handleAddToShoppingList}
          onRecipeClick={setSelectedRecipe}
        />

        <RecipeDetailModal
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          recipe={selectedRecipe}
          onAddToList={() => {
            handleAddToShoppingList(selectedRecipe?.id);
            setSelectedRecipe(null);
          }}
        />
      </main>

      {/* Floating Shopping List Button */}
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        onClick={() => setIsShoppingListOpen(true)}
      >
        <ShoppingBasket className="h-6 w-6" />
      </Button>

      <ShoppingListSidebar
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        items={shoppingList}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Home;
