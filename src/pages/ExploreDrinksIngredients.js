import React from 'react';
import CardIngredients from '../components/CardIngredients';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExploreDrinksIngredients() {
  return (
    <>
      <Header
        text="Explore Ingredients"
      />
      <CardIngredients type="cocktail" />
      <LowerMenu />
    </>
  );
}
