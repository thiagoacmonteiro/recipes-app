/* eslint-disable react/jsx-key */
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
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

    <div className="flex justify-center mx-auto w-5/6">
      <Carousel
        itemsToShow={ 2 }
      >
        {
          recomended.map((recipe, index) => (
            <div
              className="w-1/2 mx-2.5"
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <img
                src={ recipe[`str${type}Thumb`] }
                alt="First slide"
                className="w-5/6"
              />
              <p
                data-testid={ `${index}-recomendation-title` }
                className="text-center font-bold text-black"
              >
                {recipe[`str${type}`]}

              </p>
              <p
                className="text-center font-bold text-black"
              >
                { recipe.strCategory }

              </p>
            </div>
          ))
        }
      </Carousel>
    </div>
  );
}

CardRecomended.propTypes = {
  cocktailOrMeal: PropTypes.string.isRequired,
  typeKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
