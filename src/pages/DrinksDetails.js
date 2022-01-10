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
    <div className="bg-slate-100 h-full py-10">
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
      <div className="flex justify-center m-4">
        <ShareBtn
          testId="share-btn"
          id={ id }
          type="bebidas"
        />
        <FavoriteBtn
          id={ id }
          nameType="Drink"
          fetchType="cocktail"
          typeKey="drinks"
          type="bebida"
        />
      </div>
      <StartRecipeBtn
        id={ id }
        type="cocktails"
        routeType="bebidas"
      />
    </div>
  );
}
