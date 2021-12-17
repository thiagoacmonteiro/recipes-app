import React from 'react';
import ExploreDrinkBtn from '../components/ExploreDrinkBtn';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExploreDrinks() {
  return (
    <div>
      <Header
        text="Explorar Bebidas"
      />
      <ExploreDrinkBtn
        testid="explore-by-ingredient"
        explore="Por Ingredientes"
        name="Por Ingredientes"
      />
      <ExploreDrinkBtn
        testid="explore-surprise"
        explore="Me Surpreenda!"
        name="Me Surpreenda!"
      />
      <LowerMenu />
    </div>
  );
}
