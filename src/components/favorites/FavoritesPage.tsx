import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import RecipeCard from '../recipes/RecipeCard';
import { motion } from 'framer-motion';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        My Favorite Recipes
      </motion.h1>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">
            You don't have any favorite recipes yet.
          </p>
          <p className="text-gray-400">
            Add recipes to your favorites for quick access later.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <RecipeCard {...recipe} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
