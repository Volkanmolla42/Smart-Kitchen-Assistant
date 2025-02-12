import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, DollarSign, Plus, Utensils } from "lucide-react";

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe?: {
    title: string;
    image: string;
    cookingTime: string;
    cost: number;
    dietaryTags: string[];
    ingredients: { name: string; amount: string }[];
    instructions: string[];
  };
  onAddToList?: () => void;
}

const RecipeDetailModal = ({
  isOpen,
  onClose,
  recipe,
  onAddToList = () => {},
}: RecipeDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {recipe?.title || "Recipe Details"}
          </DialogTitle>
        </DialogHeader>

        {recipe ? (
          <div className="space-y-6">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {recipe.dietaryTags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>${recipe.cost.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Utensils className="w-5 h-5" /> Ingredients
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <span>{ingredient.name}</span>
                    <span className="text-gray-600">{ingredient.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <p className="flex-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            <Button onClick={onAddToList} className="w-full" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Ingredients to Shopping List
            </Button>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No recipe selected
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailModal;
