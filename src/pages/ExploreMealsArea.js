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
    <>
      <Header
        text="Explorar Origem"
        searchIcon={ searchIcon }
      />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
        className="
        flex justify-center mx-auto my-4  w-5/12 px-3 py-2 bg-white border
        border-gray-300 rounded-md text-sm shadow-sm focus:outline-none
        focus:border-fuchsia-700 focus:ring-1 focus:ring-violet-500"
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
      <div className="flex flex-wrap justify-center">
        { resultByArea
        && (
          resultByArea.map(({ strMealThumb, strMeal, idMeal }, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className="mx-4 my-2 w-28 rounded-lg bg-white flex
              content-center flex-col shadow-lg shadow-black-500/50 mb-4"
            >
              <input
                type="image"
                onClick={ handleClick }
                data-testid={ `${index}-card-img` }
                id={ idMeal }
                src={ strMealThumb }
                alt={ strMeal }
                className="rounded-lg w-3/4 mt-2 mx-auto"
              />
              <p
                data-testid={ `${index}-card-name` }
                id={ idMeal }
                className="text-center font-bold text-black
          no-underline mt-3
          md:underline"
              >
                { strMeal }
              </p>
            </div>
          ))
        )}
      </div>
      <LowerMenu />
    </>
  );
}
