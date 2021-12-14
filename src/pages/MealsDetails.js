import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import CardRecomended from '../components/CardRecomended';
import { fetchById, didMountFetch } from '../services/fetchApi';

export default function MealsDetails() {
  const [meal, setMeal] = useState();
  const [recomended, setRecomended] = useState([]);
  const {
    location: { pathname },
  } = useHistory();

  const id = pathname.split('/')[2];

  useEffect(() => {
    fetchById('meal', id).then((response) => setMeal(response.meals[0]));
  }, [id]);

  useEffect(() => {
    const maxLength = 6;
    didMountFetch('cocktail')
      .then((response) => {
        const sliced = response.drinks.slice(0, maxLength);
        setRecomended(sliced);
      });
  }, []);

  const ingredients = meal && Object.entries(meal).reduce((acc, value) => {
    if (value[0].includes('strIngredient') && value[1] !== '') {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const measures = meal && Object.entries(meal).reduce((acc, value) => {
    if (value[0].includes('strMeasure') && value[1] !== ' ') {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const concatenate = () => {
    const ingredientAndMeasure = [];

    ingredients.forEach((ingredient, index) => {
      ingredientAndMeasure.push(`${ingredient} - ${measures[index]}`);
    });

    return ingredientAndMeasure;
  };

  return (
    <div>
      {meal && (
        <>
          <CardDetails
            object={ meal }
            concatenate={ concatenate }
            type="Meal"
            category="Category"
          />
          <div>
            { recomended.length > 0
            && (
              <CardRecomended
                recomended={ recomended }
                type="Drink"
              />
            ) }
          </div>
          <button type="button" data-testid="share-btn">
            Compartilhar
          </button>

          <button type="button" data-testid="favorite-btn">
            Favoritar
          </button>

          <button type="button" data-testid="start-recipe-btn">
            Iniciar Receita
          </button>
        </>
      )}
    </div>
  );
}
