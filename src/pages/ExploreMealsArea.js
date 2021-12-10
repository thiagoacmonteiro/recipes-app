import React from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import searchIcon from '../images/searchIcon.svg';

export default function ExploreMealsArea() {
  return (
    <div>
      <Header
        text="Explorar Origem"
        searchIcon={ searchIcon }
      />
      <p> Explore Meals Area </p>
      <LowerMenu />
    </div>
  );
}
