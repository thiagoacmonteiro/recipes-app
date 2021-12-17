import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../contexts/Context';
import { fetchIngredients, fetchIngredientsList } from '../services/fetchApi';

export default function CardIngredientsDrinks({ type }) {
  const [ingredients, setIngredients] = useState();
  const { setResultFetch } = useContext(Context);
  const limit = 12;
  const history = useHistory();

  useEffect(() => {
    fetchIngredientsList(type)
      .then(({ drinks }) => setIngredients(drinks.slice(0, limit)));
  }, []);

  async function handleClick({ target: { name } }) {
    const getFetchIngredients = await fetchIngredients(name, type);
    setResultFetch(getFetchIngredients.drinks);
    history.push('/bebidas');
  }

  return (
    <div>
      { ingredients
        && ingredients.map(({ strIngredient1 }, index) => (
          <button
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ handleClick }
            type="button"
            name={ strIngredient1 }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
              name={ strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
              name={ strIngredient1 }
            >
              { strIngredient1 }
            </p>
          </button>
        ))}
    </div>
  );
}

CardIngredientsDrinks.propTypes = {
  type: PropTypes.string.isRequired,
};
