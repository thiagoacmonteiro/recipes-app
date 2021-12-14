import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchById, didMountFetch } from '../services/fetchApi';

export default function DrinksDetails() {
  const [drinks, setDrinks] = useState();
  const [recomended, setRecomended] = useState([]);
  const {
    location: { pathname },
  } = useHistory();

  const id = pathname.split('/')[2];

  useEffect(() => {
    fetchById('cocktail', id).then((response) => setDrinks(response.drinks[0]));
  }, [id]);

  useEffect(() => {
    const maxLength = 6;
    didMountFetch('meal')
      .then((response) => {
        const sliced = response.meals.slice(0, maxLength);
        setRecomended(sliced);
      });
  }, []);

  const ingredients = drinks && Object.entries(drinks).reduce((acc, value) => {
    if (value[0].includes('strIngredient') && value[1] !== null && value[1] !== '') {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const measures = drinks && Object.entries(drinks).reduce((acc, value) => {
    if (value[0].includes('strMeasure') && value[1] !== ' ' && value[1] !== null) {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const concatenate = () => {
    const ingredientAndMeasure = [];

    ingredients.forEach((ingredient, index) => {
      ingredientAndMeasure.push(`${ingredient} - ${measures[index]}`);
    });

    return ingredientAndMeasure;
  };

  return (
    <div>
      {drinks && (
        <>
          <img src={ drinks.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{ drinks.strDrink }</p>
          <p data-testid="recipe-category">{ drinks.strAlcoholic }</p>

          <ul>
            {
              concatenate().map((ingredient, index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{ drinks.strInstructions }</p>
          <div>
            { recomended.length > 0
            && (
              recomended.map((recipe, index) => (
                <div key={ index }>
                  <span
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { recipe.strMeal }
                  </span>
                  <span
                    data-testid={ `${index}-recomendation-card` }
                  >
                    {recipe.strMeal}
                  </span>
                </div>
              ))) }
          </div>
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
