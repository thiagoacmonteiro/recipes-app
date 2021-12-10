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
    <div className="search-bar-container">
      <form>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Pesquisar"
          value={ inputValue }
          onChange={ handleInputChange }
          className="form-control"
        />
        <label htmlFor="ingrediente">
          Ingrediente
          <input
            type="radio"
            name="radio-btn"
            value="radioIngredients"
            id="ingrediente"
            data-testid="ingredient-search-radio"
            onClick={ handleClickFilter }
          />
        </label>
        <label htmlFor="nome">
          nome
          <input
            type="radio"
            name="radio-btn"
            value="radioName"
            id="nome"
            data-testid="name-search-radio"
            onClick={ handleClickFilter }
          />
        </label>
        <label htmlFor="primeiro-letra">
          Primeira letra
          <input
            type="radio"
            name="radio-btn"
            value="radioLetter"
            id="primeiro-letra"
            data-testid="first-letter-search-radio"
            onClick={ handleClickFilter }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClickSearch }
          className="btn btn-outline-secondary"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
