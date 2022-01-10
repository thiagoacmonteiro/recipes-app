import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ShareBtnDoneRecipes from '../components/ShareBtnDoneRecipes';

export default function RecipesMade() {
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (doneRecipes !== null) setRecipes(doneRecipes);
  }, []);

  function handleClick({ target: { name } }) {
    if (name === 'All') return setRecipes(doneRecipes);
    setRecipes(doneRecipes.filter((recipe) => recipe.type === name));
  }

  function handleRedirect({ target: { name } }) {
    history.push(name);
  }

  return (
    <div>
      <Header
        text="Receitas Feitas"
      />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
        name="All"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleClick }
        name="comida"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
        name="bebida"
      >
        Drinks
      </button>
      { recipes.map((recipe, index) => (
        <div key={ index }>
          <input
            type="image"
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            name={ `${recipe.type}s/${recipe.id}` }
            onClick={ handleRedirect }
            className="done-image"
          />
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>
              {`Name: ${recipe.name}`}
            </p>
          </Link>
          { recipe.type === 'comida'
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`Category: ${recipe.area} - ${recipe.category}`}
              </p>)
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`Category: ${recipe.alcoholicOrNot} - ${recipe.category}`}
              </p>)}
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
      <p> Recipes Made </p>
    </div>
  );
}
