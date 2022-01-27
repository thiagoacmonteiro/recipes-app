/* eslint-disable indent */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setFavoriteRecipes, getFavRecipes } from '../services/localStorage';
import { fetchById } from '../services/fetchApi';

export default function FavoriteBtn({
  id,
  fetchType,
  typeKey,
  type,
  nameType,
}) {
  const [favHeart, setFavHeart] = useState(false);
  const [stateType, setStateType] = useState([]);

  function handleClick() {
    if (getFavRecipes() === null || !getFavRecipes().some((e) => e.id === id)) {
      setFavoriteRecipes(stateType, nameType, type);
      setFavHeart(true);
    } else {
      const filtered = getFavRecipes().filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
      setFavHeart(false);
    }
  }

  function checkFav() {
    if (getFavRecipes() === null) {
      setFavHeart(false);
    } else if (getFavRecipes().some((e) => e.id === id)) {
      setFavHeart(true);
    } else {
      setFavHeart(false);
    }
  }

  useEffect(() => {
    checkFav();
  }, []);

  useEffect(() => {
    fetchById(fetchType, id).then((response) => setStateType(response[typeKey][0]));
  }, []);

  return (
    <div
      className="m-4 bg-gray-300 p-2 rounded-xl h-12 w-12
    flex items-center justify-center"
    >
      <input
        data-testid="favorite-btn"
        type="image"
        onClick={ handleClick }
        value="favoritas"
        src={ favHeart ? blackHeartIcon : whiteHeartIcon }
        alt="favoriteHeart"
      />
    </div>
  );
}

FavoriteBtn.propTypes = {
  fetchType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  nameType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  typeKey: PropTypes.string.isRequired,
};
