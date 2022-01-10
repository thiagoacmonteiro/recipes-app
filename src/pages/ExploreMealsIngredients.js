import React from 'react';
import CardIngredients from '../components/CardIngredients';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExploreMealsIngredients() {
  return (
    <>
      <Header
        text="Explorar Ingredientes"
      />
      <CardIngredients type="meal" />
      <LowerMenu />
    </>
  );
}
