import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { fetchIngredients, fetchByName, fetchByFirstLetter } from '../services/fetchApi';
import Context from '../contexts/Context';
import '../styles/SearchBar.css';

export default function FilterForm() {
  const { setResultFetch } = useContext(Context);

  const [selectedFilter, setSelectedFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { location: { pathname } } = useHistory();

  const history = useHistory();

  function handleClickFilter({ target: { value } }) {
    setSelectedFilter(value);
  }

  async function chosenFetch() {
    const fetch = {
      radioIngredients: fetchIngredients,
      radioName: fetchByName,
      radioLetter: fetchByFirstLetter,
    };
    let response = [];
    if (pathname === '/comidas') {
      response = await fetch[selectedFilter](inputValue, 'meal');
      setResultFetch(response.meals);
      if (response.meals !== null && response.meals.length === 1) {
        history.push(`/comidas/${response.meals[0].idMeal}`);
      }
    } else {
      response = await fetch[selectedFilter](inputValue, 'cocktail');
      setResultFetch(response.drinks);
      if (response.drinks !== null && response.drinks.length === 1) {
        history.push(`/bebidas/${response.drinks[0].idDrink}`);
      }
    }
  }

  const handleClickSearch = () => {
    if (selectedFilter === 'radioLetter' && inputValue.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (selectedFilter === '') return global.alert('Selecione um filtro');

    chosenFetch();
  };

  function handleInputChange({ target: { value } }) {
    setInputValue(value);
  }

  return (
    <div className="flex items-center justify-around">
      <form>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
          value={ inputValue }
          onChange={ handleInputChange }
          className="my-3  w-full px-3 py-2 bg-white border
          border-gray-300 rounded-md text-sm shadow-sm
          placeholder-gray-400   focus:outline-none
          focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
        <div>
          <label htmlFor="ingrediente" className="font-bold mx-1">
            <span>
              Ingredient
            </span>
            <input
              type="radio"
              name="radio-btn"
              value="radioIngredients"
              id="ingrediente"
              data-testid="ingredient-search-radio"
              onClick={ handleClickFilter }
            />
          </label>
          <label htmlFor="nome" className="font-bold mx-1">
            <span>
              Name
            </span>
            <input
              type="radio"
              name="radio-btn"
              value="radioName"
              id="nome"
              data-testid="name-search-radio"
              onClick={ handleClickFilter }
            />
          </label>
          <label htmlFor="primeiro-letra" className="font-bold mx-1">
            <span className="m-1">
              First Letter
            </span>
            <input
              type="radio"
              name="radio-btn"
              value="radioLetter"
              id="primeiro-letra"
              data-testid="first-letter-search-radio"
              onClick={ handleClickFilter }
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClickSearch }
          className="w-full bg-black text-lg font-bold
          text-white border-2 border-purple-900 rounded-md my-2 h-10
          hover:opacity-75 transition ease-in-out delay-150
          hover:-translate-y-1 hover:scale-105"
        >
          Search
        </button>
      </form>
    </div>
  );
}
