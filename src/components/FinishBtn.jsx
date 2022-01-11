import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchById } from '../services/fetchApi';
import { setDoneRecipes } from '../services/localStorage';

function FinishBtn({
  id,
  fetchType,
  typeKey,
  type,
  nameType,
  ingredients,
  localIngredients }) {
  const [disabled, setDisabled] = useState(true);
  const [recipeData, setRecipeData] = useState();
  const history = useHistory();
  const completeDate = new Date();
  const day = completeDate.getDate();
  const month = completeDate.getMonth();
  const year = completeDate.getFullYear();
  const date = `${day}/${month + 1}/${year}`;

  function handleClick() {
    setDoneRecipes(recipeData, nameType, type, date);

    history.push('/receitas-feitas');
  }

  useEffect(() => {
    if (ingredients.length !== 0 && localIngredients.length === ingredients.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [ingredients]);

  useEffect(() => {
    fetchById(fetchType, id).then((response) => setRecipeData(response[typeKey][0]));
  }, []);

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ handleClick }
      disabled={ disabled }
      className="flex items-center justify-center w-2/4 bg-black text-lg font-bold
      text-white border-2 border-purple-900 rounded-md my-2 h-10
      hover:opacity-75 transition ease-in-out delay-150
      hover:-translate-y-1 hover:scale-105 disabled:opacity-75 disabled:bg-zinc-500"
    >
      Finish
    </button>
  );
}

FinishBtn.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  localIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  fetchType: PropTypes.string.isRequired,
  typeKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nameType: PropTypes.string.isRequired,
};

export default FinishBtn;
