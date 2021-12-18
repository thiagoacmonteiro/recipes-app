import React, { useEffect, useState } from 'react';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import useId from '../hooks/useId';
import { fetchById } from '../services/fetchApi';
import '../styles/InProgressPages.css';
import { setIngredients, getIngredients } from '../services/localStorage';

export default function DrinksInProgress() {
  const [startedDrink, setStartedDrink] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [checkIngredients, setCheckIngredients] = useState({});

  const id = useId();

  useEffect(() => {
    fetchById('cocktail', id).then(({ drinks }) => setStartedDrink({ ...drinks[0] }));
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      setCheckedIngredients(getIngredients('cocktails', id));
    }
  }, []);

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

  function handleClick({ target }) {
    console.log(target);
    setCheckIngredients(
      { ...checkIngredients, [target.value]: !checkIngredients[target.value] },
    );
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      setIngredients('cocktails', id, target.name);
      setCheckedIngredients(getIngredients('cocktails', id));
    }
  }

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
                  className={ checkIngredients[ingredient] && 'conclud' }
                >
                  {`${ingredient} - ${measures[index] ? measures[index] : 'to taste'}`}
                  <input
                    type="checkbox"
                    value={ ingredient }
                    name={ ingredient }
                    onChange={ handleClick }
                    checked
                    // defaultChecked={ checkedIngredients.includes(ingredient) && 'checked' }
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
            type="bebidas"
          />

        </>)}
    </div>
  );
}
