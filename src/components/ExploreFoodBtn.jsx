import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRandom } from '../services/fetchApi';

export default function ExploreFoodBtn({ testid, explore, name }) {
  const history = useHistory();
  const [random, setRandom] = useState('');

  useEffect(() => {
    fetchRandom('meal').then((response) => setRandom(response.meals[0].idMeal));
  }, []);

  function handleClick() {
    switch (name) {
    case 'Por Ingredientes':
      history.push('/explorar/comidas/ingredientes');
      break;
    case 'Por Local de Origem':
      history.push('/explorar/comidas/area');
      break;
    case 'Me Surpreenda!':
      history.push(`/comidas/${random}`);
      break;
    default:
      history.push('/');
    }
  }

  return (
    <button
      type="button"
      data-testid={ testid }
      onClick={ handleClick }
    >
      { explore }
    </button>
  );
}

ExploreFoodBtn.propTypes = {
  explore: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};
