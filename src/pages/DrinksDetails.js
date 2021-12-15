import React from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import CardRecomended from '../components/CardRecomended';
import '../styles/cardDetails.css';

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
