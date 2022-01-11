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
    <div className="w-1/2">
      { !doneIds.includes(id)
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
          value={ buttonText }
          className="w-2/4 bg-black text-lg font-bold
          text-white border-2 border-purple-900 rounded-md my-2 h-10
          hover:opacity-75 transition ease-in-out delay-150
          hover:-translate-y-1 hover:scale-105 fixed bottom-0"
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
