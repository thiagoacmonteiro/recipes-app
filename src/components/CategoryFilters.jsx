import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { categorysFetch, fetchByCategory, didMountFetch } from '../services/fetchApi';
import Context from '../contexts/Context';

export default function CategoryFilters({ type, objectKey }) {
  const { setResultFetch, setCategoryFetch, clicked, setClicked } = useContext(Context);
  const { location: { pathname } } = useHistory();

  const [categorys, setCategorys] = useState([]);

  const limit = 5;
  const limit12 = 12;

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
  function checkClicked(name) {
    if (clicked.nameBtn !== name || clicked.nameBtn === '') {
      setClicked({ nameBtn: name, clickBtn: true });
    } else if (clicked.nameBtn === name) {
      setClicked({
        clickBtn: false,
      });
    }
  }

  async function filterByCategory({ target: { name } }) {
    const filteredByCategory = await fetchByCategory(type, name);
    checkClicked(name);
    if (type === 'meal') {
      setCategoryFetch(filteredByCategory.meals.slice(0, limit12));
    } else {
      setCategoryFetch(filteredByCategory.drinks.slice(0, limit12));
    }
  }

  function getAll() {
    setClicked({
      nameBtn: '',
      clickBtn: false,
    });
    if (pathname === '/comidas') {
      didMountFetch('meal').then((result) => setResultFetch(result.meals));
    } else didMountFetch('cocktail').then((result) => setResultFetch(result.drinks));
  }

  return (
    <section
      className="flex flex-wrap justify-around
      w-screen h-fit mx-2 bg-gray-800"
    >
      { categorys.length > 0 && restrictResult().map((category) => (
        <button
          type="button"
          className="
          bg-gray-300 rounded-lg mx-3 my-2
          px-1 py-1 shadow-lg shadow-gray-50
          text-black font-extrabold h-fit w-fit focus:outline-none "
          name={ category.strCategory } // Incluí esse name para usar como parâmetro através do target na função filterByCategory
          key={ category.strCategory }
          click={ clicked }
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
        className="
          bg-gray-300 rounded-lg mx-2 my-2
          px-1 py-1 shadow-lg shadow-gray-50
          text-black font-extrabold h-fit w-14 focus:outline-none"
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
