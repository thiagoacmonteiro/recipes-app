import React from 'react';
import CardIngredientsMeals from '../components/CardIngredientsMeals';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExploreMealsIngredients() {
  return (
    <div>
      <Header
        text="Explorar Ingredientes"
      />
      <CardIngredientsMeals type="meal" />
      <LowerMenu />
    </div>
  );
}
