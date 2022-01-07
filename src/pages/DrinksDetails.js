import React from 'react';
import CardDetails from '../components/CardDetails';
import CardRecomended from '../components/CardRecomended';
import '../styles/cardDetails.css';
import StartRecipeBtn from '../components/StartRecipeBtn';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import useId from '../hooks/useId';

export default function DrinksDetails() {
  const id = useId();

  return (
    <div>
      <CardDetails
        type="Drink"
        typeKey="drinks"
        fetchType="cocktail"
        category="Alcoholic"
        id={ id }
      />
      <CardRecomended
        cocktailOrMeal="meal"
        typeKey="meals"
        type="Meal"
      />
      <ShareBtn testId="share-btn" />
      <FavoriteBtn
        id={ id }
        nameType="Drink"
        fetchType="cocktail"
        typeKey="drinks"
        type="bebida"
      />
      <StartRecipeBtn
        id={ id }
        type="cocktails"
        routeType="bebidas"
      />
    </div>
  );
}
