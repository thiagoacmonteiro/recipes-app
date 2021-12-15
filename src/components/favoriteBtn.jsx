/* eslint-disable indent */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setFavoriteRecipes, getFavRecipes } from '../services/localStorage';

export default function FavoriteBtn({ id }) {
  const [favHeart, setFavHeart] = useState(false);
  function handleClick() {
    if (getFavRecipes() === null || !getFavRecipes().includes(id)) {
      setFavoriteRecipes(id);
      setFavHeart(true);
    } else {
        const filtered = getFavRecipes().filter((e) => e !== id);
        localStorage.setItem(
            'favoriteRecipes', JSON.stringify(filtered),
        );
        setFavHeart(false);
    }
  }

  function checkFav() {
    if (getFavRecipes() === null) {
      setFavHeart(false);
    } else if (getFavRecipes().includes(id)) {
      setFavHeart(true);
    } else {
      setFavHeart(false);
    }
  }

  useEffect(() => {
    checkFav();
  }, []);

  return (
    <div>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ handleClick }
        value="favoritas"
      >
        <img src={ favHeart ? blackHeartIcon : whiteHeartIcon } alt="favorited" />
      </button>
    </div>
  );
}

FavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
};
