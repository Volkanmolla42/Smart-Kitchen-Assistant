import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChefHat, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RecipeCard from "./recipes/RecipeCard";
import { getRandomRecipes, Recipe } from "../services/recipeService";

const HeroSection: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const newRecipes = await getRandomRecipes(3);
      setRecipes(newRecipes);
    } catch (err) {
      setError("Tarifler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero İçeriği */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Akıllı Mutfak Asistanı
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Malzemelerinizden lezzetli tarifler oluşturun
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={fetchRandomRecipes}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg mb-12"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <ChefHat className="w-5 h-5 mr-2" />
              )}
              {loading ? "Tarifler Yükleniyor..." : "Yeni Tarifler Göster"}
            </Button>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mb-8"
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Tarif Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {recipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <RecipeCard {...recipe} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Arkaplan Deseni */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:60px_60px]" />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              x: Math.random() * 100,
              y: Math.random() * 100,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <ChefHat className="w-8 h-8 text-orange-300/20" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
