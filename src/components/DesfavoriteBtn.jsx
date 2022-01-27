/* eslint-disable indent */
import PropTypes from 'prop-types';
import React from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getFavRecipes } from '../services/localStorage';

export default function DesfavoriteBtn({ id, setFavRecipes, testId }) {
  function handleClick() {
    const filtered = getFavRecipes().filter((e) => e.id !== id);
    console.log(filtered);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    setFavRecipes(filtered);
  }

  return (
    <div
      className="bg-gray-300 mx-2 p-2 rounded-xl h-12 w-12
    flex items-center justify-center"
    >
      <input
        data-testid={ testId }
        type="image"
        onClick={ handleClick }
        value="favoritas"
        src={ blackHeartIcon }
        alt="favoriteHeart"
      />
    </div>
  );
}

DesfavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
  setFavRecipes: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};
