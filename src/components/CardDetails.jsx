import PropTypes from 'prop-types';
import React from 'react';

export default function CardDetails({ object, concatenate, type, category }) {
  console.log(object);
  return (
    <section>
      <img src={ object[`str${type}Thumb`] } alt="" data-testid="recipe-photo" />
      <p data-testid="recipe-title">{ object[`str${type}`] }</p>
      <p data-testid="recipe-category">{ object[`str${category}`] }</p>

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
      <p data-testid="instructions">{object.strInstructions}</p>
      <a href={ object.strYoutube } data-testid="video">{object.strYoutube}</a>
    </section>
  );
}

CardDetails.propTypes = {
  concatenate: PropTypes.func.isRequired,
  object: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
