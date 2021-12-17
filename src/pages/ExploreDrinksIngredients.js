import React from 'react';
import CardIngredientsDrinks from '../components/cardIngredientsDrinks';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExploreDrinksIngredients() {
  return (
    <div>
      <Header
        text="Explorar Ingredientes"
      />
      <CardIngredientsDrinks type="cocktail" />
      <LowerMenu />
    </div>
  );
}
