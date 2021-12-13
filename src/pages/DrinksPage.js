import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Context from '../contexts/Context';
import Card from '../components/Card';
import LowerMenu from '../components/LowerMenu';
import { didMountFetch } from '../services/fetchApi';
import CategoryFilters from '../components/CategoryFilters';

export default function DrinksPage() {
  const { resultFetch, setResultFetch, clicked, categoryFetch } = useContext(Context);
  const limit = 12;

  useEffect(() => {
    didMountFetch('cocktail')
      .then((result) => setResultFetch(result.drinks));
  }, [setResultFetch]);

  function restrictResult() {
    if (clicked.clickBtn) {
      return categoryFetch;
    }
    return resultFetch.slice(0, limit);
  }

  return (
    <div>
      <Header searchIcon={ searchIcon } text="Bebidas" />
      <CategoryFilters type="cocktail" objectKey="drinks" />
      {
        resultFetch === null ? (
          global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        ) : restrictResult().map((recipe, index) => (
          <Card
            key={ index }
            index={ index }
            cardName={ recipe.strDrink }
            img={ recipe.strDrinkThumb }
          />
        ))
      }
      <LowerMenu />
    </div>
  );
}
