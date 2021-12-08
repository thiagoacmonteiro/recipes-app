import React from 'react';
import Header from '../components/header';
import searchIcon from '../images/searchIcon.svg';

export default function MealsPage() {
  return (
    <div>
      <Header
        searchIcon={ searchIcon }
        text="Comidas"
      />
      <p> Página principal de receitas </p>
    </div>
  );
}
