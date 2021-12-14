/* eslint-disable react/jsx-key */
import PropTypes from 'prop-types';
import React from 'react';
import '../styles/cardDetails.css';

export default function CardRecomended({ recomended, type }) {
  const arr = recomended.map((recipe) => (
    {
      category: recipe.strCategory,
      image: recipe[`str${type}Thumb`],
      name: recipe[`str${type}`],
    }
  ));

  return (
    <div className="recomended-container">
      {
        arr.map((card, index) => (
          <div
            className="card-container"
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img
              src={ card.image }
              alt="First slide"
              className="image-card"
            />
            <p data-testid={ `${index}-recomendation-title` }>{card.name}</p>
            <p>{ card.category }</p>
          </div>
        ))
      }
    </div>
  );
}

CardRecomended.propTypes = {
  recomended: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};
