import React from 'react';
import ExploreDrinkBtn from '../components/ExploreDrinkBtn';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import dringBgPage from '../images/explore-drinks-page.svg';

export default function ExploreDrinks() {
  return (
    <div>
      <Header
        text="Explorar Bebidas"
      />
      <div className="flex items-center flex-col my-6">
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
      </div>
      <img
        src={ dringBgPage }
        alt="img-bg"
        className="mt-2
        w-5/6 mx-auto md:w-96 top-full"
      />
      <LowerMenu />
    </div>
  );
}
