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

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    ingredients: [
      "400g spaghetti",
      "200g pancetta",
      "4 large eggs",
      "100g Pecorino Romano",
      "100g Parmigiano-Reggiano",
      "Black pepper",
      "Salt"
    ],
    instructions: [
      "Bring a large pot of salted water to boil",
      "Cook spaghetti according to package instructions",
      "Meanwhile, cook pancetta until crispy",
      "Beat eggs with grated cheese and pepper",
      "Combine pasta with egg mixture and pancetta"
    ],
    cookingTime: "25 mins",
    cost: 15.99,
    dietaryTags: ["Italian", "Contains Eggs"]
  },
  {
    id: "2",
    title: "Fresh Garden Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    ingredients: [
      "Mixed salad greens",
      "Cherry tomatoes",
      "Cucumber",
      "Red onion",
      "Avocado",
      "Olive oil",
      "Balsamic vinegar"
    ],
    instructions: [
      "Wash and dry all vegetables",
      "Slice cucumber and tomatoes",
      "Dice avocado and onion",
      "Combine all ingredients in a bowl",
      "Dress with olive oil and vinegar"
    ],
    cookingTime: "15 mins",
    cost: 8.99,
    dietaryTags: ["Vegan", "Gluten-Free", "Low-Carb"]
  }
];
