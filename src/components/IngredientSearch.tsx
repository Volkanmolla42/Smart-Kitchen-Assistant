import React, { useState } from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X, Search } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Ingredient {
  id: string;
  name: string;
}

interface IngredientSearchProps {
  onIngredientAdd?: (ingredient: Ingredient) => void;
  onIngredientRemove?: (id: string) => void;
  selectedIngredients?: Ingredient[];
}

const mockIngredients = [
  { id: "1", name: "Tomatoes" },
  { id: "2", name: "Pasta" },
  { id: "3", name: "Olive Oil" },
  { id: "4", name: "Garlic" },
  { id: "5", name: "Basil" },
  { id: "6", name: "Chicken" },
  { id: "7", name: "Rice" },
  { id: "8", name: "Onion" },
  { id: "9", name: "Bell Pepper" },
  { id: "10", name: "Mushrooms" },
  { id: "11", name: "Cheese" },
  { id: "12", name: "Eggs" },
  { id: "13", name: "Potatoes" },
  { id: "14", name: "Carrots" },
  { id: "15", name: "Spinach" },
];

const IngredientSearch = ({
  onIngredientAdd = () => {},
  onIngredientRemove = () => {},
  selectedIngredients = [],
}: IngredientSearchProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredIngredients = mockIngredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      !selectedIngredients.find((selected) => selected.id === ingredient.id),
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-sm">
      <div className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              <Search className="mr-2 h-4 w-4" />
              Search ingredients...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search ingredients..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>No ingredients found.</CommandEmpty>
                <CommandGroup heading="Available Ingredients">
                  {filteredIngredients.map((ingredient) => (
                    <CommandItem
                      key={ingredient.id}
                      onSelect={() => {
                        onIngredientAdd(ingredient);
                        setOpen(false);
                        setSearchValue("");
                      }}
                    >
                      {ingredient.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex flex-wrap gap-2">
          {selectedIngredients.map((ingredient) => (
            <Badge
              key={ingredient.id}
              variant="secondary"
              className="px-3 py-1 text-sm"
            >
              {ingredient.name}
              <button
                className="ml-2 hover:text-destructive"
                onClick={() => onIngredientRemove(ingredient.id)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientSearch;
