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
  console.log(stateType);
  console.log(stateType.strYoutube);
  return (
    <section className="flex flex-col items-center justify-center">
      { stateType && (
        <>
          <img
            src={ stateType[`str${type}Thumb`] }
            alt=""
            data-testid="recipe-photo"
            className="w-5/6 mt-4 rounded-md shadow-lg shadow-black-500/50 mb-4"
          />
          <p
            data-testid="recipe-title"
            className="text-center font-bold text-black
            no-underline mt-3 text-2xl md:underline"
          >
            { stateType[`str${type}`] }

          </p>
          <p
            data-testid="recipe-category"
            className="text-center font-serif italic text-black
          no-underline mt-3
          md:underline"
          >
            { stateType[`str${category}`]}

          </p>

          <ul
            className="text-center font-bold text-black
            no-underline mt-3 md:underline"
          >
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
          <p
            data-testid="instructions"
            className="text-center font-extrabold bg-gray-300 w-5/6 rounded-xl p-4
            text-black no-underline mt-3 md:underline
            shadow-lg shadow-black-500/50 mb-4"
          >
            {stateType.strInstructions}

          </p>
          {
            (stateType.strYoutube || stateType.strVideo)
          && (
            <iframe
              width="75%"
              height="360"
              src={ stateType.strYoutube || stateType.strVideo }
              // https://www.youtube.com/embed/mulqW-J3Yy4 adicionar o embed
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="my-6 shadow-xl shadow-slate-600 border-8 border-white"
            />

          )
          }
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
