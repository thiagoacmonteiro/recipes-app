import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../contexts/Context';
import { fetchIngredients, fetchIngredientsList } from '../services/fetchApi';

export default function CardIngredientsMeals({ type }) {
  const [ingredients, setIngredients] = useState();
  const { setResultFetch } = useContext(Context);
  const limit = 12;
  const history = useHistory();

  useEffect(() => {
    fetchIngredientsList(type)
      .then(({ meals }) => setIngredients(meals.slice(0, limit)));
  }, []);

  async function handleClick({ target: { name } }) {
    const getFetchIngredients = await fetchIngredients(name, type);
    setResultFetch(getFetchIngredients.meals);
    history.push('/comidas');
  }

  return (
    <div>
      { ingredients
        && ingredients.map(({ strIngredient }, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            name={ strIngredient }
            onClick={ handleClick }
          >
            { console.log(strIngredient) }
            <img
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
              data-testid={ `${index}-card-img` }
              name={ strIngredient }
            />
            <p
              data-testid={ `${index}-card-name` }
              name={ strIngredient }
            >
              { strIngredient }
            </p>
          </button>
        ))}
    </div>
  );
}

CardIngredientsMeals.propTypes = {
  type: PropTypes.string.isRequired,
};
