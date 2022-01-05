import React, { useEffect, useState, useCallback } from 'react';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import useId from '../hooks/useId';
import { fetchById } from '../services/fetchApi';
import '../styles/InProgressPages.css';
import { setIngredients, getIngredients,
  setRecipesInProgress } from '../services/localStorage';

export default function DrinksInProgress() {
  const [startedDrink, setStartedDrink] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const id = useId();

  useEffect(() => {
    fetchById('cocktail', id).then(({ drinks }) => setStartedDrink({ ...drinks[0] }));
    if (localStorage.getItem('inProgressRecipes') !== null
    && getIngredients('cocktails', id) !== undefined) {
      setCheckedIngredients(getIngredients('cocktails', id));
    } else {
      setRecipesInProgress('cocktails', id);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setIngredients('cocktails', id, checkedIngredients);
    }
  }, [checkedIngredients, setIngredients]);

  const ingredients = startedDrink
    && Object.entries(startedDrink).reduce((acc, value) => {
      if (value[0].includes('strIngredient') && value[1] !== '' && value[1] !== null) {
        acc.push(value[1]);
      }
      return acc;
    }, []);

  const measures = startedDrink
    && Object.entries(startedDrink).reduce((acc, value) => {
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
    <div>
      { startedDrink && (
        <>
          <img src={ startedDrink.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{ startedDrink.strDrink }</p>
          <p data-testid="recipe-category">{ startedDrink.strCategory}</p>

          <ul>
            {
              ingredients.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                  className={ checkedIngredients.includes(ingredient) && 'conclud' }
                >
                  {`${ingredient} - ${measures[index] ? measures[index] : 'to taste'}`}
                  <input
                    type="checkbox"
                    value={ ingredient }
                    name={ ingredient }
                    onChange={ handleClick }
                    checked={
                      checkedIngredients.includes(ingredient)
                    }
                  />
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
            nameType="Drink"
            fetchType="cocktail"
            typeKey="drinks"
            type="bebida"
          />

        </>)}
    </div>
  );
}
