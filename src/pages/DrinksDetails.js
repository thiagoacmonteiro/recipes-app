import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import { fetchById, didMountFetch } from '../services/fetchApi';
import CardRecomended from '../components/CardRecomended';

export default function DrinksDetails() {
  const [drinks, setDrinks] = useState();
  const [recomended, setRecomended] = useState([]);
  const {
    location: { pathname },
  } = useHistory();

  const id = pathname.split('/')[2];

  useEffect(() => {
    fetchById('cocktail', id).then((response) => setDrinks(response.drinks[0]));
  }, [id]);

  useEffect(() => {
    const maxLength = 6;
    didMountFetch('meal')
      .then((response) => {
        const sliced = response.meals.slice(0, maxLength);
        setRecomended(sliced);
      });
  }, []);

  const ingredients = drinks && Object.entries(drinks).reduce((acc, value) => {
    if (value[0].includes('strIngredient') && value[1] !== null && value[1] !== '') {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const measures = drinks && Object.entries(drinks).reduce((acc, value) => {
    if (value[0].includes('strMeasure') && value[1] !== ' ' && value[1] !== null) {
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
      {drinks && (
        <>
          <CardDetails
            object={ drinks }
            concatenate={ concatenate }
            type="Drink"
            category="Alcoholic"
          />
          <div>
            { recomended.length > 0
            && (
              <CardRecomended
                recomended={ recomended }
                type="Meal"
              />
            )}
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
