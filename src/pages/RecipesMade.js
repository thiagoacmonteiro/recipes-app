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
    if (doneRecipes === null) {
      return global.alert('Sua lista de receitas feitas está vazia');
    }
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
      <div
        className="
      flex flex-col items-center mb-4 mt-2"
      >
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
          name="All"
          className="w-2/4 bg-black text-lg font-bold
        text-white border-2 border-purple-900 rounded-md my-2 h-10
        hover:opacity-75 transition ease-in-out delay-150
        hover:-translate-y-1 hover:scale-105"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClick }
          name="comida"
          className="w-2/4 bg-black text-lg font-bold
        text-white border-2 border-purple-900 rounded-md my-2 h-10
        hover:opacity-75 transition ease-in-out delay-150
        hover:-translate-y-1 hover:scale-105"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClick }
          name="bebida"
          className="w-2/4 bg-black text-lg font-bold
        text-white border-2 border-purple-900 rounded-md my-2 h-10
        hover:opacity-75 transition ease-in-out delay-150
        hover:-translate-y-1 hover:scale-105"
        >
          Drinks
        </button>
      </div>
      <div className="flex flex-col items-center mx-auto my-auto">
        { recipes.map((recipe, index) => (
          <div
            key={ index }
            className="my-2 w-3/4 px-4 py-6 rounded-lg bg-white flex
            content-center flex-col items-center
            shadow-lg shadow-black-500/50 mb-4 hover:scale-105"
          >
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <p
                data-testid={ `${index}-horizontal-name` }
                className="text-center font-bold text-black no-underline mt-3
                md:underline"
              >
                {`Name: ${recipe.name}`}
              </p>
            </Link>
            <input
              type="image"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              name={ `${recipe.type}s/${recipe.id}` }
              onClick={ handleRedirect }
              className="w-full rounded-lg"
            />
            { recipe.type === 'comida'
              ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="text-center italic text-black no-underline mt-2
                  md:underline"
                >
                  {`Category: ${recipe.area} - ${recipe.category}`}
                </p>)
              : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="text-center italic
                  text-black no-underline mt-2
                  md:underline"
                >
                  {`Category: ${recipe.alcoholicOrNot} - ${recipe.category}`}
                </p>)}
            <p
              data-testid={ `${index}-horizontal-done-date` }
              className="text-center font-extralight text-black no-underline mt-1
            md:underline"
            >
              {`Date: ${recipe.doneDate}`}
            </p>
            <ShareBtnDoneRecipes
              testId={ `${index}-horizontal-share-btn` }
              id={ recipe.id }
              type={ recipe.type === 'comida' ? 'comidas' : 'bebidas' }
            />
            { recipe.tags.map((tag, index2) => (
              <p
                key={ index }
                data-testid={ `${index}-${tag}-horizontal-tag` }
                className="italic text-xs"
              >
                {`Tag ${index2 + 1}: ${recipe.tags[index2]}`}
              </p>
            ))}
          </div>
        )) }
      </div>
    </div>
  );
}
