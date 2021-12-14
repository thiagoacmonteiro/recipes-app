import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchById, didMountFetch } from '../services/fetchApi';

export default function MealsDetails() {
  const [meal, setMeal] = useState();
  const [recomended, setRecomended] = useState([]);
  const {
    location: { pathname },
  } = useHistory();

  const id = pathname.split('/')[2];

  useEffect(() => {
    fetchById('meal', id).then((response) => setMeal(response.meals[0]));
  }, [id]);

  useEffect(() => {
    const maxLength = 6;
    didMountFetch('cocktail')
      .then((response) => {
        const sliced = response.drinks.slice(0, maxLength);
        setRecomended(sliced);
      });
  }, []);

  const ingredients = meal && Object.entries(meal).reduce((acc, value) => {
    if (value[0].includes('strIngredient') && value[1] !== '') {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const measures = meal && Object.entries(meal).reduce((acc, value) => {
    if (value[0].includes('strMeasure') && value[1] !== ' ') {
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
      {meal && (
        <>
          <img src={ meal.strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{meal.strMeal}</p>
          <p data-testid="recipe-category">{meal.strCategory}</p>

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
          <p data-testid="instructions">{meal.strInstructions}</p>
          <a href={ meal.strYoutube } data-testid="video">{meal.strYoutube}</a>
          <div>
            { recomended.length > 0
            && (
              recomended.map((recipe, index) => (
                <div key={ index }>
                  <span
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { recipe.strDrink }
                  </span>
                  <span
                    data-testid={ `${index}-recomendation-card` }
                  >
                    {recipe.strDrink}
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
