import React from 'react';
import Header from '../components/header';
import searchIcon from '../images/searchIcon.svg';

export default function DrinksPage() {
  return (
    <div>
      <Header
        searchIcon={ searchIcon }
        text="Bebidas"
      />
      <p> Página principal de Bebidas </p>
    </div>
  );
}
