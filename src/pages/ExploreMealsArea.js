import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import searchIcon from '../images/searchIcon.svg';
import { fetchByArea, fetchAreas, didMountFetch } from '../services/fetchApi';

export default function ExploreMealsArea() {
  const [areas, setAreas] = useState([]);
  const [resultByArea, setResultByArea] = useState();
  const limit = 12;
  const history = useHistory();

  useEffect(() => {
    fetchAreas()
      .then((response) => setAreas(response.meals));
    didMountFetch('meal')
      .then((response) => setResultByArea(response.meals.slice(0, limit)));
  }, []);

  async function handleChange({ target: { value } }) {
    const result = await fetchByArea(value);
    if (value !== 'all') {
      setResultByArea(result.meals.slice(0, limit));
    } else {
      const resultFetch = await didMountFetch('meal');
      setResultByArea(resultFetch.meals.slice(0, limit));
    }
  }

  function handleClick({ target: { id } }) {
    history.push(`/comidas/${id}`);
  }

  return (
    <div>
      <Header
        text="Explorar Origem"
        searchIcon={ searchIcon }
      />
      <p> Explore Meals Area </p>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
      >
        { areas.map(({ strArea }, index) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ index }
            value={ strArea }
          >
            { strArea }
          </option>
        )) }
        <option
          value="all"
          data-testid="All-option"
        >
          All
        </option>
      </select>
      { resultByArea
        && (
          resultByArea.map(({ strMealThumb, strMeal, idMeal }, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <input
                type="image"
                onClick={ handleClick }
                data-testid={ `${index}-card-img` }
                id={ idMeal }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <p
                data-testid={ `${index}-card-name` }
                id={ idMeal }
              >
                { strMeal }
              </p>
            </div>
          ))
        )}
      <LowerMenu />
    </div>
  );
}
