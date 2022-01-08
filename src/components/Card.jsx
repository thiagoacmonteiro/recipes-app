import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ index, cardName, img, recipeId, path }) {
  return (
    <Link
      to={ `/${path}/${recipeId}` }
    >
      <section
        className=" my-4 h-60 w-60 rounded-lg bg-white flex
        content-center flex-col  mb-4 mx-auto"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ img }
          alt="imagem da receita"
          data-testid={ `${index}-card-img` }
          className="rounded-lg w-3/4 mt-2 mx-auto"
        />
        <p
          data-testid={ `${index}-card-name` }
          className="text-center font-bold text-black
          no-underline mt-3
          md:underline"
        >
          {cardName}

        </p>
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
