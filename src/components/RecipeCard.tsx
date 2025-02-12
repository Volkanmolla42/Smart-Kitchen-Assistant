import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, DollarSign, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface RecipeCardProps {
  title?: string;
  image?: string;
  cookingTime?: string;
  cost?: number;
  dietaryTags?: string[];
  onAddToList?: () => void;
  onClick?: () => void;
}

const RecipeCard = ({
  onClick = () => {},
  title = "Delicious Pasta Primavera",
  image = "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
  cookingTime = "30 mins",
  cost = 12.99,
  dietaryTags = ["Vegetarian", "Gluten-Free"],
  onAddToList = () => console.log("Add to shopping list clicked"),
}: RecipeCardProps) => {
  return (
    <Card
      className="w-[280px] h-[320px] bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {dietaryTags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{cookingTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{cost.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onAddToList}
                className="w-full"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to List
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
