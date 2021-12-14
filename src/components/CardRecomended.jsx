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
  const newArr1 = [...arr];
  console.log(newArr1);

  return (
    <div className="recomended-container">
      {
        newArr1.map((card, index) => (
          <div className="card-container" data-testid={ `${index}-recomendation-card` }>
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

/*         <span
          data-testid={ `${index}-recomendation-title` }
        >
          { recipe[`str${type}`] }
        </span>
        <span
          data-testid={ `${index}-recomendation-card` }
        >
          { recipe2[`str${type}`] }
     </span> */

CardRecomended.propTypes = {
  recomended: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};
