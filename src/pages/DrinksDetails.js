<<<<<<< HEAD
import React, { Component } from 'react';
import { fetchById } from '../services/fetchApi';

class DrinksDetails extends Component {
  constructor() {
    super();

    this.state = {
      recipeInfo: {},
      ingredients: [],
      measures: [],
      nameAndMeasure: [],
    };

    this.concatenateArrays = this.concatenateArrays.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    fetchById('cocktail', id)
      .then((result) => this.setState({ recipeInfo: result.drinks[0] }))
      .then(() => {
        const { recipeInfo } = this.state;
        console.log(recipeInfo);
        this.setState({
          ingredients: Object.entries(recipeInfo)
            .filter((entry) => entry[0].includes('strIngredient'))
            .map((entry) => entry[1])
            .filter((ingredient) => ingredient !== null),
          measures: Object.entries(recipeInfo)
            .filter((entry) => entry[0].includes('strMeasure'))
            .map((entry) => entry[1])
            .filter((measure) => measure !== null),
        });
      })
      .then(() => {
        this.concatenateArrays();
      });
  }

  concatenateArrays() {
    const { ingredients, measures } = this.state;
    const nameAndMeasure = [];

    ingredients.forEach((ingredient, index) => {
      nameAndMeasure.push(`${ingredient} - ${measures[index]}`);
    });

    this.setState({
      nameAndMeasure,
    });
  }

  render() {
    const { recipeInfo, nameAndMeasure } = this.state;

    return (
      <div>
        { recipeInfo !== {}
        && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipeInfo.strDrinkThumb }
              alt={ recipeInfo.strDrink }
            />
            <span data-testid="recipe-title">{ recipeInfo.strDrink }</span>
            <span data-testid="recipe-category">{ recipeInfo.strCategory }</span>
            <ul>
              { nameAndMeasure.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { ingredient }
                </li>
              )) }
            </ul>
            
            <p data-testid="instructions">{ recipeInfo.strInstructions }</p>
            <button type="button" data-testid="share-btn">Compartilhar</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
            <button type="button" data-testid="start-recipe-btn">Iniciar</button>
          </div>) }
      </div>
    );
  }
=======
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchById, didMountFetch } from '../services/fetchApi';

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
      .then((response) => setRecomended(response.meals.splice(0, maxLength)));
  }, []);

  const ingredients = drinks && Object.entries(drinks).reduce((acc, value) => {
    if (value[0].includes('strIngredient') && value[1] !== null) {
      acc.push(value[1]);
    }
    return acc;
  }, []);

  const measures = drinks && Object.entries(drinks).reduce((acc, value) => {
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
      {drinks && (
        <>
          <img src={ drinks.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{drinks.strDrink}</p>
          <p data-testid="recipe-category">{drinks.strAlcoholic}</p>

          <ul>
            {
              concatenate().map((ingredient, index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{drinks.strInstructions}</p>
          <div>
            { recomended.length > 0
            && (
              recomended.map((recipe, index) => (
                <div key={ index }>
                  <span
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { recipe.strMeal }
                  </span>
                  <span
                    data-testid={ `${index}-recomendation-card` }
                  >
                    {recipe.strMeal}
                  </span>
                </div>
              ))) }
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
>>>>>>> 5d5958873f7346362364793b64a51a9c3e72a1a0
}

export default DrinksDetails;
