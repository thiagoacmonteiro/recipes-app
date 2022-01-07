import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';

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
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.date}</p>
          <ShareBtn testId={ `${index}-horizontal-share-btn` } />
          { recipe.tags.map((tag) => (
            <p
              key={ index }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {recipe.tags}
            </p>
          )) }
        </div>
      )) }
      <p> Recipes Made </p>
    </div>
  );
}
