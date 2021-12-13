import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { categorysFetch, fetchByCategory, didMountFetch } from '../services/fetchApi';
import Context from '../contexts/Context';

export default function CategoryFilters({ type, objectKey }) {
  const { setResultFetch } = useContext(Context);
  const { location: { pathname } } = useHistory();

  const [categorys, setCategorys] = useState([]);
  const limit = 5;

  useEffect(() => {
    categorysFetch(type)
      .then((result) => setCategorys(result[objectKey]));
  }, [objectKey, type]);

  function restrictResult() {
    if (categorys.length < limit) {
      return categorys;
    }
    return categorys.slice(0, limit);
  }

  // Função que chama a função fetchByCategory importada do service fetchApi
  // Utiliza o type desestruturado na linha 6 para fazer o fetch de acordo com a página (DrinksPage ou MealsPàge) e o name
  // desestruturado através no target para filtrar de acordo com o nome da categoria
  // Seta o resultFetch de acordo com o type para que seja feito o map das receitas a cada click em um determinado botão de
  // categoria
  async function filterByCategory({ target: { name } }) {
    const filteredByCategory = await fetchByCategory(type, name);

    if (type === 'meal') {
      setResultFetch(filteredByCategory.meals);
    } else {
      setResultFetch(filteredByCategory.drinks);
    }
  }

  function getAll() {
    if (pathname === '/comidas') {
      didMountFetch('meals').then((result) => setResultFetch(result.meals));
    } else didMountFetch('cocktail').then((result) => setResultFetch(result.drinks));
  }

  return (
    <section>
      { categorys.length > 0 && restrictResult().map((category) => (
        <button
          type="button"
          name={ category.strCategory } // Incluí esse name para usar como parâmetro através do target na função filterByCategory
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ filterByCategory }
        >
          {category.strCategory}
        </button>
      ))}
      <button
        type="button"
        onClick={ getAll }
        data-testid="All-category-filter"
      >
        All
      </button>
    </section>
  );
}

CategoryFilters.propTypes = {
  objectKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
