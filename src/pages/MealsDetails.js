<<<<<<< HEAD
import React, { Component } from 'react';
import { fetchById } from '../services/fetchApi';

class MealsDetails extends Component {
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

    fetchById('meal', id)
      .then((result) => this.setState({ recipeInfo: result.meals[0] }))
      .then(() => {
        const { recipeInfo } = this.state;
        console.log(recipeInfo);
        this.setState({
          ingredients: Object.entries(recipeInfo)
            .filter((entry) => entry[0].includes('strIngredient'))
            .map((entry) => entry[1])
            .filter((ingredient) => ingredient !== ''),
          measures: Object.entries(recipeInfo)
            .filter((entry) => entry[0].includes('strMeasure'))
            .map((entry) => entry[1])
            .filter((measure) => measure !== ''),
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
              src={ recipeInfo.strMealThumb }
              alt={ recipeInfo.strMeal }
            />
            <span data-testid="recipe-title">{ recipeInfo.strMeal }</span>
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
      .then((response) => setRecomended(response.drinks.splice(0, maxLength)));
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
          <img src={ meal.strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{meal.strMeal}</p>
          <p data-testid="recipe-category">{meal.strCategory}</p>

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
          <p data-testid="instructions">{meal.strInstructions}</p>
          <a href={ meal.strYoutube } data-testid="video">{meal.strYoutube}</a>
          <div>
            { recomended.length > 0
            && (
              recomended.map((recipe, index) => (
                <div key={ index }>
                  <span
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { recipe.strDrink }
                  </span>
                  <span
                    data-testid={ `${index}-recomendation-card` }
                  >
                    {recipe.strDrink}
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

export default MealsDetails;
