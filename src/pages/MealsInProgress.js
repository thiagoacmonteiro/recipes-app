import React, { useEffect, useState } from 'react';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import useId from '../hooks/useId';
import { fetchById } from '../services/fetchApi';

export default function MealsInProgress() {
  const [startedMeal, setStartedMeal] = useState({});

  const id = useId();

  useEffect(() => {
    fetchById('meal', id).then(({ meals }) => setStartedMeal({ ...meals[0] }));
  }, []);

  const ingredients = startedMeal && Object.entries(startedMeal).reduce((acc, value) => {
    if (value[0].includes('strIngredient') && value[1] !== '' && value[1] !== null) {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const measures = startedMeal && Object.entries(startedMeal).reduce((acc, value) => {
    if (value[0].includes('strMeasure') && value[1] !== ' ' && value[1] !== null) {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  console.log(startedMeal);

  return (
    <section>
      { startedMeal && (
        <>
          <img src={ startedMeal.strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{ startedMeal.strMeal }</p>
          <p data-testid="recipe-category">{ startedMeal.strCategory}</p>

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
          <p data-testid="instructions">{startedMeal.strInstructions}</p>
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
    </section>
  );
}
