/* eslint-disable react/jsx-key */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { didMountFetch } from '../services/fetchApi';
import '../styles/cardDetails.css';

export default function CardRecomended({ type, cocktailOrMeal, typeKey }) {
  const [recomended, setRecomended] = useState([]);

  useEffect(() => {
    const maxLength = 6;
    didMountFetch(cocktailOrMeal)
      .then((response) => {
        const sliced = response[typeKey].slice(0, maxLength);
        setRecomended(sliced);
      });
  }, []);

  return (
    <div className="recomended-container">
      {
        recomended.map((recipe, index) => (
          <div
            className="card-container"
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img
              src={ recipe[`str${type}Thumb`] }
              alt="First slide"
              className="image-card"
            />
            <p data-testid={ `${index}-recomendation-title` }>{recipe[`str${type}`]}</p>
            <p>{ recipe.strCategory }</p>
          </div>
        ))
      }
    </div>
  );
}

CardRecomended.propTypes = {
  cocktailOrMeal: PropTypes.string.isRequired,
  typeKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
