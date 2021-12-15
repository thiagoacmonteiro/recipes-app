import React from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import CardRecomended from '../components/CardRecomended';
import '../styles/cardDetails.css';
import StartRecipeBtn from '../components/StartRecipeBtn';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/favoriteBtn';

export default function DrinksDetails() {
  const {
    location: { pathname },
  } = useHistory();

  const id = pathname.split('/')[2];

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
      <ShareBtn />
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
