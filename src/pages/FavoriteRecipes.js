import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DesfavoriteBtn from '../components/DesfavoriteBtn';
import Header from '../components/Header';
import ShareBtnDoneRecipes from '../components/ShareBtnDoneRecipes';
import { getFavRecipes } from '../services/localStorage';

export default function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (getFavRecipes() !== null) setFavRecipes(getFavRecipes());
  }, []);

  function handleClick({ target: { name } }) {
    if (name === 'All') return setFavRecipes(getFavRecipes());
    setFavRecipes(getFavRecipes().filter((recipe) => recipe.type === name));
  }

  function handleRedirect({ target: { name } }) {
    history.push(name);
  }

  return (
    <div>
      <Header
        text="Receitas Favoritas"
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
      { favRecipes.map((recipe, index) => (
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
          <ShareBtnDoneRecipes
            testId={ `${index}-horizontal-share-btn` }
            id={ recipe.id }
            type={ recipe.type === 'comida' ? 'comidas' : 'bebidas' }
          />
          <DesfavoriteBtn
            testId={ `${index}-horizontal-favorite-btn` }
            id={ recipe.id }
            setFavRecipes={ setFavRecipes }
          />
        </div>
      )) }
      <p> Favorite Recipes </p>
    </div>
  );
}
