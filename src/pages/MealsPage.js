import React, { useContext } from 'react';
import Context from '../contexts/Context';
import Header from '../components/header';
import searchIcon from '../images/searchIcon.svg';
import Card from '../components/Card';

const limit = 12;

export default function MealsPage() {
  const { resultFetch } = useContext(Context);

  return (
    <div>
      <Header searchIcon={ searchIcon } text="Comidas" />
      {resultFetch === null
        ? global.alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        )
        : resultFetch.map((recipe, index) => {
          if (index === limit) {
            return <p />;
          }
          return (
            <Card
              key={ index }
              index={ index }
              cardName={ recipe.strMeal }
              img={ recipe.strMealThumb }
            />
          );
        })}
    </div>
  );
}

// global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
