import React, { useContext, useEffect } from 'react';
import Context from '../contexts/Context';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Card from '../components/Card';
import LowerMenu from '../components/LowerMenu';
import { didMountFetch } from '../services/fetchApi';
import CategoryFilters from '../components/CategoryFilters';

export default function MealsPage() {
  const { resultFetch, setResultFetch } = useContext(Context);
  const limit = 12;

  useEffect(() => {
    didMountFetch('meal')
      .then((result) => setResultFetch(result.meals));
  }, [setResultFetch]);

  function restrictResult() {
    if (resultFetch.length < limit) {
      return resultFetch;
    }
    return resultFetch.slice(0, limit);
  }

  return (
    <div>
      <Header searchIcon={ searchIcon } text="Comidas" />
      <CategoryFilters type="meal" objectKey="meals" />
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
          />
        ))}
      <LowerMenu />
    </div>
  );
}
