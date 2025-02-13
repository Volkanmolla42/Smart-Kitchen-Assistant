import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Heart, Clock, DollarSign, Plus } from "lucide-react";
import { useFavorites } from '../../context/FavoritesContext';
import { cn } from '../../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime?: string;
  cost?: number;
  dietaryTags?: string[];
  onAddToList?: () => void;
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  ingredients,
  instructions,
  cookingTime = "30 mins",
  cost = 0,
  dietaryTags = [],
  onAddToList,
  onClick,
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorite = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, title, image, ingredients, instructions });
    }
  };

  return (
    <Card 
      className="w-full max-w-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <CardHeader className="relative p-0">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 bg-white/80 hover:bg-white transition-all duration-300",
            favorite ? "text-red-500 scale-110" : "text-gray-500 hover:text-red-500 hover:scale-110"
          )}
          onClick={handleFavoriteClick}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("w-5 h-5", favorite && "fill-current")} />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        
        {/* Tags */}
        {dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {dietaryTags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{cookingTime}</span>
          </div>
          {cost > 0 && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{cost.toFixed(2)}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500">
          {ingredients.length} ingredients • {instructions.length} steps
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToList?.();
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Shopping List
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add ingredients to shopping list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
