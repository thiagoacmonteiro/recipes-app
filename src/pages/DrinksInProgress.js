import React, { useEffect, useState } from 'react';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import useId from '../hooks/useId';
import { fetchById } from '../services/fetchApi';
import '../styles/InProgressPages.css';

export default function DrinksInProgress() {
  const [startedDrink, setStartedDrink] = useState({});
  const [checkIngredients, setCheckIngredients] = useState({});

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

  const measures = startedDrink
    && Object.entries(startedDrink).reduce((acc, value) => {
      if (value[0].includes('strMeasure') && value[1] !== ' ' && value[1] !== null) {
        acc.push(value[1]);
      }
      return acc;
    }, []);

  const templateCheckIngredients = ingredients.reduce((acc, value) => {
    acc[value] = false;
    return acc;
  }, {});

  useEffect(() => (
    setCheckIngredients(templateCheckIngredients)),
  [startedDrink]);

  function checkIngredient({ target: { value } }) {
    setCheckIngredients({ ...checkIngredients, [value]: !checkIngredients[value] });
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
                    id={ ingredient }
                    onClick={ checkIngredient }

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
