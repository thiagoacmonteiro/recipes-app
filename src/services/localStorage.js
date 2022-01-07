export function setTokens() {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
}

export function setUser(loginData) {
  localStorage.setItem('user', JSON.stringify(loginData));
}

export function getUser() {
  const user = localStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user).email;
  }
  return 'Faça o login';
}

export function setRecipesInProgress(type, id) {
  const localStorageData = localStorage.getItem('inProgressRecipes');
  const inProgressRecipes = JSON.parse(localStorageData);
  console.log(inProgressRecipes);

  if (localStorageData === null) {
    return (
      localStorage.setItem(
        'inProgressRecipes', JSON.stringify({
          meals: { },
          cocktails: { },
          [type]: { [id]: [] },
        }),
      ));
  }

  console.log(localStorageData);

  return (
    localStorage.setItem(
      'inProgressRecipes', JSON.stringify(
        {
          ...inProgressRecipes,
          [type]: { ...inProgressRecipes[type], [id]: [] },
        },
      ),
    )
  );
}

export function getIngredients(type, id) {
  return JSON.parse(localStorage.getItem('inProgressRecipes'))[type][id];
}

export function setIngredients(type, id, ingredients) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  return (
    localStorage.setItem(
      'inProgressRecipes', JSON.stringify(
        {
          ...inProgressRecipes,
          [type]: {
            ...inProgressRecipes[type],
            [id]: ingredients,
          },
        },
      ),
    )
  );
}

export function setFavoriteRecipes(stateType, nameType, type) {
  const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (localStorageData === null) {
    return (
      localStorage.setItem(
        'favoriteRecipes', JSON.stringify([{
          id: stateType[`id${nameType}`],
          type,
          area: type === 'comida' ? stateType.strArea : '',
          category: stateType.strCategory,
          alcoholicOrNot: type === 'bebida' ? stateType.strAlcoholic : '',
          name: stateType[`str${nameType}`],
          image: stateType[`str${nameType}Thumb`],
        }]),
      ));
  }

  return (
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify(
        [...localStorageData, {
          id: stateType[`id${nameType}`],
          type,
          area: type === 'comida' ? stateType.strArea : '',
          category: stateType.strCategory,
          alcoholicOrNot: type === 'bebida' ? stateType.strAlcoholic : '',
          name: stateType[`str${nameType}`],
          image: stateType[`str${nameType}Thumb`],
        }],
      ),
    )
  );
}

export function getFavRecipes() {
  const fav = localStorage.getItem('favoriteRecipes');
  const favJSON = JSON.parse(fav);
  return favJSON;
}

export function setDoneRecipes(recipeData, nameType, type, date) {
  const localStorageData = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(nameType);

  if (localStorageData === null) {
    return (
      localStorage.setItem(
        'doneRecipes', JSON.stringify([{
          id: recipeData[`id${nameType}`],
          type,
          area: type === 'comida' ? recipeData.strArea : '',
          category: recipeData.strCategory,
          alcoholicOrNot: type === 'bebida' ? recipeData.strAlcoholic : '',
          name: recipeData[`str${nameType}`],
          image: recipeData[`str${nameType}Thumb`],
          doneDate: date,
          tags: recipeData.strTags !== null ? recipeData.strTags.split(',') : [],
        }]),
      ));
  }

  return (
    localStorage.setItem(
      'doneRecipes', JSON.stringify(
        [...localStorageData, {
          id: recipeData[`id${nameType}`],
          type,
          area: type === 'comida' ? recipeData.strArea : '',
          category: recipeData.strCategory,
          alcoholicOrNot: type === 'bebida' ? recipeData.strAlcoholic : '',
          name: recipeData[`str${nameType}`],
          image: recipeData[`str${nameType}Thumb`],
          doneDate: date,
          tags: recipeData.strTags,
        }],
      ),
    )
  );
}
