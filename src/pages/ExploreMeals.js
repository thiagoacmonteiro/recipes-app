import React from 'react';
import ExploreFoodBtn from '../components/ExploreFoodBtn';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import mealBgPage from '../images/explore-meals-page.svg';

export default function ExploreMeals() {
  return (
    <div>
      <Header
        text="Explorar Comidas"
      />
      <div className="flex flex-col items-center my-4">
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

      </div>
      <img
        src={ mealBgPage }
        alt="img-bg"
        className="mt-2
        w-5/6 mx-auto md:w-96 top-full"
      />
      <LowerMenu />
    </div>
  );
}
