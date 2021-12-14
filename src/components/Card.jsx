import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ index, cardName, img, recipeId, path }) {
  return (
    <Link
      to={ `/${path}/${recipeId}` }
    >
      <section data-testid={ `${index}-recipe-card` }>
        <img
          src={ img }
          alt="imagem da receita"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{cardName}</p>
      </section>
    </Link>
  );
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeId: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
