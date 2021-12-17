import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../contexts/Context';
import { fetchIngredients, fetchIngredientsList } from '../services/fetchApi';

export default function CardIngredients({ type }) {
  const [ingredients, setIngredients] = useState();
  const { setResultFetch } = useContext(Context);
  const limit = 12;
  const history = useHistory();

  useEffect(() => {
    fetchIngredientsList(type)
      .then((response) => {
        if (type === 'meal') {
          setIngredients(response.meals.slice(0, limit));
        } else {
          setIngredients(response.drinks.slice(0, limit));
        }
      });
  }, []);

  async function handleClick({ target: { name } }) {
    const getFetchIngredients = await fetchIngredients(name, type);
    if (type === 'meal') {
      setResultFetch(getFetchIngredients.meals);
      history.push('/comidas');
    } else {
      setResultFetch(getFetchIngredients.drinks);
      history.push('/bebidas');
    }
  }

  const str = type === 'meal' ? 'strIngredient' : 'strIngredient1';

  return (
    <div>
      { ingredients
        && (
          ingredients.map((ingredient, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              name={ ingredient[str] }
              onClick={ handleClick }
            >
              <img
                src={ `https://www.the${type}db.com/images/ingredients/${ingredient[str]}-Small.png` }
                alt={ ingredient[str] }
                data-testid={ `${index}-card-img` }
                name={ ingredient[str] }
              />
              <p
                data-testid={ `${index}-card-name` }
                name={ ingredient[str] }
              >
                { ingredient[str] }
              </p>
            </button>
          )))}
    </div>
  );
}

CardIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};
