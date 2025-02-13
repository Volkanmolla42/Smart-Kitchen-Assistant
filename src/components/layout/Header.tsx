import React from 'react';
import { Button } from '../ui/button';
import { Heart, ChefHat } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="w-6 h-6 text-orange-500" />
          <span className="font-bold text-xl">Smart Kitchen</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link to="/favorites">
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5 mr-1" />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  {favorites.length}
                </motion.div>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
