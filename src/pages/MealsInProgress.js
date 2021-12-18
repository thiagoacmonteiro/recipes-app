import React, { useEffect, useState } from 'react';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import useId from '../hooks/useId';
import { fetchById } from '../services/fetchApi';
import '../styles/InProgressPages.css';
import { setIngredients, getIngredients } from '../services/localStorage';

export default function MealsInProgress() {
  const [startedMeal, setStartedMeal] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [checkIngredients, setCheckIngredients] = useState({});

  const id = useId();

  useEffect(() => {
    fetchById('meal', id).then(({ meals }) => setStartedMeal({ ...meals[0] }));
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      setCheckedIngredients(getIngredients('meals', id));
    }
  }, []);

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

  function handleClick({ target }) {
    console.log(target);
    console.log(checkedIngredients);
    setCheckIngredients(
      { ...checkIngredients, [target.value]: !checkIngredients[target.value] },
    );
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      setIngredients('meals', id, target.name);
      setCheckedIngredients(getIngredients('meals', id));
    }
  }

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
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                  className={ checkIngredients[ingredient] && 'conclud' }
                >
                  {`${ingredient} - ${measures[index] ? measures[index] : 'to taste'}`}
                  <input
                    type="checkbox"
                    value={ ingredient }
                    name={ ingredient }
                    onClick={ handleClick }
                    checked
                    // defaultChecked={ checkedIngredients.includes(ingredient) && 'checked' }
                  />
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
