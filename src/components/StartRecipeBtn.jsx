import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
// import { setRecipesInProgress } from '../services/localStorage';

export default function StartRecipeBtn({ routeType, type, id }) {
  const [buttonText, setButtonText] = useState('Iniciar Receita');
  const [doneIds, setDoneIds] = useState([]);
  const history = useHistory();

  const localStorageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const doneRecipesIds = doneRecipes !== null && doneRecipes.map((recipe) => recipe.id);

  function setButtonTextFunction() {
    if (localStorageData !== null && Object.keys(localStorageData).includes(type)) {
      const localKeys = Object.keys(localStorageData[type]);
      if (localKeys && localKeys.includes(id)) setButtonText('Continuar Receita');
    }
  }

  useEffect(() => {
    setButtonTextFunction();
    if (doneRecipes !== null) setDoneIds(doneRecipesIds);
  }, []);

  function handleClick() {
    history.push(`/${routeType}/${id}/in-progress`);
  }

  return (
    <div>
      { !doneIds.includes(id)
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="startRecipe"
          onClick={ handleClick }
          value={ buttonText }
        >
          { buttonText }
        </button>)}
    </div>
  );
}

StartRecipeBtn.propTypes = {
  id: PropTypes.string.isRequired,
  routeType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
