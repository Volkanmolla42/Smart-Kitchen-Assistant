import React from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/layout/Header';
import HeroSection from './components/HeroSection';
import FavoritesPage from './components/favorites/FavoritesPage';
import Home from "./components/home";
import routes from "tempo-routes";

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </div>
    </FavoritesProvider>
  );
};

export default App;
