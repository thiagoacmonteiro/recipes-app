import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { setRecipesInProgress } from '../services/localStorage';

export default function StartRecipeBtn({ routeType, type, id }) {
  const [buttonText, setButtonText] = useState('Iniciar Receita');
  const history = useHistory();

  const localStorageData = JSON.parse(localStorage.getItem('inProgressRecipes'));

  function setButtonTextFunction() {
    if (localStorageData !== null && Object.keys(localStorageData).includes(type)) {
      const localKeys = Object.keys(localStorageData[type]);
      if (localKeys && localKeys.includes(id)) setButtonText('Continuar Receita');
    }
  }

  useEffect(() => {
    setButtonTextFunction();
  }, []);

  function handleClick({ target }) {
    if (target.value === 'Iniciar Receita') {
      setRecipesInProgress(type, id);
    }
    history.push(`/${routeType}/${id}/in-progress`);
  }

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="startRecipe"
      onClick={ handleClick }
      value={ buttonText }
    >
      { buttonText }
    </button>
  );
}

StartRecipeBtn.propTypes = {
  id: PropTypes.string.isRequired,
  routeType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
