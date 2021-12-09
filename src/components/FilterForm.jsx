import React, { useState } from 'react';
import { fetchIngredients, fetchByName, fetchByFirstLetter } from '../services/fetchApi';

export default function FilterForm() {
  const [isChecked, setIsCheked] = useState({
    radioIngredients: false,
    radioName: false,
    radioLetter: false,
  });

  const [selectedFilter, setSelectedFilter] = useState('');
  const [inputValue, setInputValue] = useState('');

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

    const response = await fetch[selectedFilter](inputValue);
    console.log(response);
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
