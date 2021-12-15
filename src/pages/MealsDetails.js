import React from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import CardRecomended from '../components/CardRecomended';

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
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>

      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>

      <button
        type="button"
        data-testid="start-recipe-btn"
        className="startRecipe"
      >
        Iniciar Receita
      </button>
    </div>
  );
}
