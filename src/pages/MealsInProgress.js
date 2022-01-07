import React, { useEffect, useState, useCallback } from 'react';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import useId from '../hooks/useId';
import { fetchById } from '../services/fetchApi';
import '../styles/InProgressPages.css';
import { setIngredients, getIngredients,
  setRecipesInProgress } from '../services/localStorage';
import FinishBtn from '../components/FinishBtn';

export default function MealsInProgress() {
  const [startedMeal, setStartedMeal] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const id = useId();

  useEffect(() => {
    fetchById('meal', id).then(({ meals }) => setStartedMeal({ ...meals[0] }));
    if (localStorage.getItem('inProgressRecipes') !== null
    && getIngredients('meals', id) !== undefined) {
      setCheckedIngredients(getIngredients('meals', id));
    } else {
      setRecipesInProgress('meals', id);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setIngredients('meals', id, checkedIngredients);
    }
  }, [checkedIngredients, setIngredients]);

  const ingredients = startedMeal
    && Object.entries(startedMeal).reduce((acc, value) => {
      if (value[0].includes('strIngredient') && value[1] !== '' && value[1] !== null) {
        acc.push(value[1]);
      }
      return acc;
    }, []);

  const measures = startedMeal
    && Object.entries(startedMeal).reduce((acc, value) => {
      if (value[0].includes('strMeasure') && value[1] !== ' ' && value[1] !== null) {
        acc.push(value[1]);
      }
      return acc;
    }, []);

  const handleClick = useCallback(({ target }) => {
    if (checkedIngredients.includes(target.name)) {
      setCheckedIngredients(checkedIngredients.filter((ingredient) => (
        ingredient !== target.name
      )));
    } else setCheckedIngredients([...checkedIngredients, target.name]);
  }, [checkedIngredients, setCheckedIngredients, id]);

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
                <label
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                  className={ checkedIngredients.includes(ingredient) && 'conclud' }
                  key={ ingredient }
                >
                  {`${ingredient} - ${measures[index] ? measures[index] : 'to taste'}`}
                  <input
                    type="checkbox"
                    value={ ingredient }
                    name={ ingredient }
                    onChange={ handleClick }
                    id={ ingredient }
                    checked={
                      checkedIngredients.includes(ingredient)
                    }
                  />
                </label>
              ))
            }
          </ul>
          <p data-testid="instructions">{startedMeal.strInstructions}</p>
          <FinishBtn
            id={ id }
            nameType="Meal"
            fetchType="meal"
            typeKey="meals"
            type="comida"
            ingredients={ ingredients }
            localIngredients={ checkedIngredients }
          />

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
