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
    case 'By Ingredient':
      history.push('/explorar/comidas/ingredientes');
      break;
    case 'By Area':
      history.push('/explorar/comidas/area');
      break;
    case 'Surprise Me!':
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
      className="w-1/3 mx-2 bg-black text-lg font-bold
        text-white border-2 border-purple-900 rounded-md my-2 h-16
        hover:opacity-75 transition ease-in-out delay-150
        hover:-translate-y-1 hover:scale-105"
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
