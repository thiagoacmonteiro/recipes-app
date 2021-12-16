import React from 'react';
import CardDetails from '../components/CardDetails';
import CardRecomended from '../components/CardRecomended';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import StartRecipeBtn from '../components/StartRecipeBtn';
import useId from '../hooks/useId';

export default function MealsDetails() {
  const id = useId();

  return (
    <div>
      <CardDetails
        type="Meal"
        typeKey="meals"
        fetchType="meal"
        category="Category"
        id={ id }
      />
      <CardRecomended
        cocktailOrMeal="cocktail"
        typeKey="drinks"
        type="Drink"
      />
      <ShareBtn />

      <FavoriteBtn
        id={ id }
        nameType="Meal"
        fetchType="meal"
        typeKey="meals"
        type="comida"
      />

      <StartRecipeBtn
        id={ id }
        type="meals"
        routeType="comidas"
      />
    </div>
  );
}
