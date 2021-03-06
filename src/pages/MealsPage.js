import React, { useContext, useEffect } from 'react';
import Context from '../contexts/Context';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Card from '../components/Card';
import LowerMenu from '../components/LowerMenu';
import { didMountFetch } from '../services/fetchApi';
import CategoryFilters from '../components/CategoryFilters';

export default function MealsPage() {
  const { resultFetch, setResultFetch, clicked, categoryFetch } = useContext(Context);
  const limit = 12;

  useEffect(() => {
    if (resultFetch.length === 0 || resultFetch[0].strMeal === undefined) {
      didMountFetch('meal')
        .then((result) => setResultFetch(result.meals));
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
      className="w-screen justify-center px-4 flex flex-col content-center items-center"
    >
      <Header searchIcon={ searchIcon } text="Meals" />
      <CategoryFilters type="meal" objectKey="meals" />
      <div
        className=" mt-8 flex w-full justify-center flex-wrap"
      >
        {resultFetch === null
          ? global.alert(
            'Sinto muito, não encontramos nenhuma receita para esses filtros.',
          )
          : restrictResult().map((recipe, index) => (
            <Card
              key={ index }
              index={ index }
              cardName={ recipe.strMeal }
              img={ recipe.strMealThumb }
              recipeId={ recipe.idMeal }
              path="comidas"
            />
          ))}
      </div>
      <LowerMenu />
    </div>
  );
}
