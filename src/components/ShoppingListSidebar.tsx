import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface ShoppingListSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: ShoppingItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

const ShoppingListSidebar = ({
  isOpen = true,
  onClose = () => console.log("Close sidebar"),
  items = [
    { id: "1", name: "Pasta", quantity: 2, price: 2.99 },
    { id: "2", name: "Tomatoes", quantity: 4, price: 0.99 },
    { id: "3", name: "Basil", quantity: 1, price: 1.5 },
  ],
  onUpdateQuantity = (id: string, quantity: number) =>
    console.log(`Update quantity for ${id} to ${quantity}`),
  onRemoveItem = (id: string) => console.log(`Remove item ${id}`),
}: ShoppingListSidebarProps) => {
  const totalCost = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[320px] sm:w-[400px] bg-white">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBasket className="w-5 h-5" />
            Shopping List
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] mt-6">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg border"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">Total</span>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              ${totalCost.toFixed(2)}
            </Badge>
          </div>
          <Button className="w-full" size="lg">
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingListSidebar;
