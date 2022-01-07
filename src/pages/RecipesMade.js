import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShareBtnDoneRecipes from '../components/ShareBtnDoneRecipes';

export default function RecipesMade() {
  const [recipes, setRecipes] = useState([]);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (doneRecipes !== null) setRecipes(doneRecipes);
  }, []);

  return (
    <div>
      <Header
        text="Receitas Feitas"
      />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      { recipes.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          { recipe.type === 'comida'
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`Category: ${recipe.area} - ${recipe.category}`}
              </p>)
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`Category: ${recipe.alcoholicOrNot} - ${recipe.category}`}
              </p>)}
          <p data-testid={ `${index}-horizontal-name` }>
            {`Name: ${recipe.name}`}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {`Date: ${recipe.doneDate}`}
          </p>
          <ShareBtnDoneRecipes
            testId={ `${index}-horizontal-share-btn` }
            id={ recipe.id }
            type={ recipe.type === 'comida' ? 'comidas' : 'bebidas' }
          />
          { recipe.tags.map((tag) => (
            <p
              key={ index }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {`Tag: ${recipe.tags}`}
            </p>
          ))}
        </div>
      )) }
      <p> Recipes Madee </p>
    </div>
  );
}
