import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchById } from '../services/fetchApi';

export default function CardDetails({ fetchType, id, type, typeKey, category }) {
  const [stateType, setStateType] = useState([]);

  useEffect(() => {
    fetchById(fetchType, id).then((response) => setStateType(response[typeKey][0]));
  }, []);

  const ingredients = stateType && Object.entries(stateType).reduce((acc, value) => {
    if (value[0].includes('strIngredient') && value[1] !== '' && value[1] !== null) {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const measures = stateType && Object.entries(stateType).reduce((acc, value) => {
    if (value[0].includes('strMeasure') && value[1] !== ' ' && value[1] !== null) {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const concatenate = () => {
    const ingredientAndMeasure = [];

    ingredients.forEach((ingredient, index) => {
      ingredientAndMeasure.push(`${ingredient} - 
      ${measures[index] ? measures[index] : 'to taste'}`);
    });

    return ingredientAndMeasure;
  };

  return (
    <section>
      { stateType && (
        <>
          <img src={ stateType[`str${type}Thumb`] } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{ stateType[`str${type}`] }</p>
          <p data-testid="recipe-category">{ stateType[`str${category}`]}</p>

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
          <p data-testid="instructions">{stateType.strInstructions}</p>
          <a href={ stateType.strYoutube } data-testid="video">{stateType.strYoutube}</a>
        </>)}
    </section>
  );
}

CardDetails.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fetchType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  typeKey: PropTypes.string.isRequired,
};
