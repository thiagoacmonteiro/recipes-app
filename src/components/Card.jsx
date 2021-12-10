import PropTypes from 'prop-types';
import React from 'react';

export default function Card({ index, cardName, img }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img
        src={ img }
        alt="imagem da receita"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{cardName}</p>
    </section>
  );
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
