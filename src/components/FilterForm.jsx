import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { fetchIngredients, fetchByName, fetchByFirstLetter } from '../services/fetchApi';
import Context from '../contexts/Context';

export default function FilterForm() {
  const { setResultFetch } = useContext(Context);

  const [isChecked, setIsCheked] = useState({
    radioIngredients: false,
    radioName: false,
    radioLetter: false,
  });

  const [selectedFilter, setSelectedFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { location: { pathname } } = useHistory();

  const history = useHistory();

  function handleClickFilter({ target: { name } }) {
    setIsCheked({ ...isChecked, [name]: !isChecked[name] });
    if (name) setSelectedFilter(name);
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
      if (response.meals.length === 1 && response.meals !== null) {
        history.push(`/comidas/${response.meals[0].idMeal}`);
      }
    } else {
      response = await fetch[selectedFilter](inputValue, 'cocktail');
      setResultFetch(response.drinks);
      if (response.drinks.length === 1) {
        history.push(`/bebidas/${response.drinks[0].idDrink}`);
      }
    }
  }

  const handleClickSearch = () => {
    if (isChecked[selectedFilter] === isChecked.radioLetter && inputValue.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    chosenFetch();
  };

  function handleInputChange({ target: { value } }) {
    setInputValue(value);
  }

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Pesquisar"
        value={ inputValue }
        onChange={ handleInputChange }
      />
      <label htmlFor="ingrediente">
        Ingrediente
        <input
          type="radio"
          name="radioIngredients"
          value="ingrediente"
          checked={ isChecked.radioIngredients }
          id="ingrediente"
          data-testid="ingredient-search-radio"
          onClick={ handleClickFilter }
        />
      </label>

      <label htmlFor="nome">
        nome
        <input
          type="radio"
          name="radioName"
          value="nome"
          checked={ isChecked.radioName }
          id="nome"
          data-testid="name-search-radio"
          onClick={ handleClickFilter }
        />
      </label>

      <label htmlFor="primeiro-letra">
        Primeira letra
        <input
          type="radio"
          name="radioLetter"
          value="primeiro-letra"
          checked={ isChecked.radioLetter }
          id="primeiro-letra"
          data-testid="first-letter-search-radio"
          onClick={ handleClickFilter }
        />
      </label>
      <button type="button" data-testid="exec-search-btn" onClick={ handleClickSearch }>
        Buscar
      </button>
    </form>
  );
}
