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
    if (resultFetch.length === 0 || resultFetch[0].strDrink === undefined) {
      didMountFetch('cocktail')
        .then((result) => setResultFetch(result.drinks));
    }
  }, []);

  function restrictResult() {
    if (clicked.clickBtn) {
      return categoryFetch;
    }
    return resultFetch.slice(0, limit);
  }

  return (
    <div
      className="w-screen justify-center px-4 flex flex-col
      content-center items-center"
    >
      <Header searchIcon={ searchIcon } text="Drinks" />
      <CategoryFilters type="cocktail" objectKey="drinks" />
      <div
        className="flex mt-8 w-10/12 justify-center flex-wrap"
      >
        {
          resultFetch === null ? (
            global.alert(`Sinto muito, não 
            encontramos nenhuma receita para esses filtros.`)
          ) : restrictResult().map((recipe, index) => (
            <Card
              key={ index }
              index={ index }
              cardName={ recipe.strDrink }
              img={ recipe.strDrinkThumb }
              recipeId={ recipe.idDrink }
              path="bebidas"
            />
          ))
        }
      </div>
      <LowerMenu />
    </div>
  );
}
