import React, { useEffect, useState } from 'react';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import useId from '../hooks/useId';
import { fetchById } from '../services/fetchApi';

export default function DrinksInProgress() {
  const [startedDrink, setStartedDrink] = useState({});

  const id = useId();

  useEffect(() => {
    fetchById('cocktail', id).then(({ drinks }) => setStartedDrink({ ...drinks[0] }));
  }, []);

  const ingredients = startedDrink
    && Object.entries(startedDrink).reduce((acc, value) => {
      if (value[0].includes('strIngredient') && value[1] !== '' && value[1] !== null) {
        acc.push(value[1]);
      }
      return acc;
    }, []);

  console.log(ingredients);

  const measures = startedDrink
    && Object.entries(startedDrink).reduce((acc, value) => {
      if (value[0].includes('strMeasure') && value[1] !== ' ' && value[1] !== null) {
        acc.push(value[1]);
      }
      return acc;
    }, []);

  return (
    <div>
      { startedDrink && (
        <>
          <img src={ startedDrink.strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{ startedDrink.strMeal }</p>
          <p data-testid="recipe-category">{ startedDrink.strCategory}</p>

          <ul>
            {
              ingredients.map((ingredient, index) => (
                <li key={ index } data-testid={ `${index}-ingredient-step` }>
                  <label htmlFor={ ingredient }>
                    {`${ingredient} - ${measures[index]}`}
                    <input type="checkbox" value={ ingredient } id={ ingredient } />
                  </label>
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{startedDrink.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">
            Finish
          </button>

          <ShareBtn />

          <FavoriteBtn
            id={ id }
            nameType="Meal"
            fetchType="meal"
            typeKey="meals"
            type="comida"
          />

        </>)}
    </div>
  );
}
