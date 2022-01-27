import React from 'react';
import ExploreFoodBtn from '../components/ExploreFoodBtn';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import mealBgPage from '../images/explore-meals-page.svg';

export default function ExploreMeals() {
  return (
    <div>
      <Header
        text="Explore Meals"
      />
      <div className="flex flex-col items-center my-4">
        <ExploreFoodBtn
          testid="explore-by-ingredient"
          explore="By Ingredient"
          name="By Ingredient"
        />
        <ExploreFoodBtn
          testid="explore-by-area"
          explore="By Area"
          name="By Area"
        />
        <ExploreFoodBtn
          testid="explore-surprise"
          explore="Surprise Me!"
          name="Surprise Me!"
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
