import React from 'react';

export default function FilterForm() {
  return (
    <form>
      <input type="text" data-testid="search-input" placeholder="Pesquisar" />
      <label htmlFor="ingrediente">
        Ingrediente
        <input
          type="radio"
          value="ingrediente"
          id="ingrediente"
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="nome">
        nome
        <input
          type="radio"
          value="nome"
          id="nome"
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="primeiro-letra">
        Primeira letra
        <input
          type="radio"
          value="primeiro-letra"
          id="primeiro-letra"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </form>
  );
}
