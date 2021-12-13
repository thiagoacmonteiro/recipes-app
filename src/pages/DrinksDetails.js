import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchById } from '../services/fetchApi';

export default function DrinksDetails() {
  const [drinks, setDrinks] = useState();
  const {
    location: { pathname },
  } = useHistory();

  const id = pathname.split('/')[2];

  useEffect(() => {
    fetchById('cocktail', id).then((response) => setDrinks(response.drinks[0]));
  }, [id]);

  const ingredients = drinks && Object.entries(drinks).reduce((acc, value) => {
    if (value[0].includes('strIngredient') && value[1] !== null) {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  return (
    <div>
      {drinks && (
        <>
          <img src={ drinks.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{drinks.strDrink}</p>
          <p data-testid="recipe-category">{drinks.strCategory}</p>

          <ul>
            {
              ingredients.map((ingredient, index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{drinks.strInstructions}</p>

          <button type="button" data-testid="share-btn">
            Compartilhar
          </button>

          <button type="button" data-testid="favorite-btn">
            Favoritar
          </button>

          <button type="button" data-testid="start-recipe-btn">
            Iniciar Receita
          </button>
        </>
      )}
    </div>
  );
}
