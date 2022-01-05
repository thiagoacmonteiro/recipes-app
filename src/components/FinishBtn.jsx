import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function FinishBtn({ ingredients, localIngredients }) {
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  function handleClick() {
    history.push('/receitas-feitas');
  }

  useEffect(() => {
    if (ingredients.length !== 0 && localIngredients.length === ingredients.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [ingredients]);

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ handleClick }
      disabled={ disabled }
    >
      Finish
    </button>
  );
}

FinishBtn.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  localIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FinishBtn;
