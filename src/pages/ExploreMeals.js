import React from 'react';
import ExploreFoodBtn from '../components/ExploreFoodBtn';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExploreMeals() {
  return (
    <div>
      <Header
        text="Explorar Comidas"
      />
      <ExploreFoodBtn
        testid="explore-by-ingredient"
        explore="Por Ingredientes"
        name="Por Ingredientes"
      />
      <ExploreFoodBtn
        testid="explore-by-area"
        explore="Por Local de Origem"
        name="Por Local de Origem"
      />
      <ExploreFoodBtn
        testid="explore-surprise"
        explore="Me Surpreenda!"
        name="Me Surpreenda!"
      />
      <LowerMenu />
    </div>
  );
}
