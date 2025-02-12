import React from "react";
import { Button } from "./ui/button";
import { ChefHat, Search } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onSearch?: () => void;
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  onSearch = () => console.log("Search clicked"),
  title = "Smart Kitchen Assistant",
  subtitle = "Transform your available ingredients into delicious meals tailored to your preferences",
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
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
            <ChefHat className="w-8 h-8 text-orange-300" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={onSearch}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Start Cooking
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
