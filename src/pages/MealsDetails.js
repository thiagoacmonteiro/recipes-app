import React from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import CardRecomended from '../components/CardRecomended';
import ShareBtn from '../components/ShareBtn';
import StartRecipeBtn from '../components/StartRecipeBtn';

export default function MealsDetails() {
  const {
    location: { pathname },
  } = useHistory();

  const id = pathname.split('/')[2];

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

      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>

      <StartRecipeBtn
        id={ id }
        type="meals"
        routeType="comidas"
      />
    </div>
  );
}
