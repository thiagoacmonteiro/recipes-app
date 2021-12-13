import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchById } from '../services/fetchApi';

export default function MealsDetails() {
  const [recipe, setRecipe] = useState();
  const {
    location: { pathname },
  } = useHistory();

  const id = pathname.split('/')[2];

  useEffect(() => {
    fetchById('meal', id).then((response) => setRecipe(response.meals[0]));
  }, [id]);

  const ingredients = recipe && Object.entries(recipe).reduce((acc, value) => {
    if (value[0].includes('strIngredient') && value[1] !== '') {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  return (
    <div>
      {recipe && (
        <>
          <img src={ recipe.strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{recipe.strMeal}</p>
          <p data-testid="recipe-category">{recipe.strCategory}</p>

          <ul>
            {
              ingredients.map((ingredient, index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <a href={ recipe.strYoutube } data-testid="video">{recipe.strYoutube}</a>

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
