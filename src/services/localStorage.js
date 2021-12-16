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

  if (inProgressRecipes === null) {
    return (
      localStorage.setItem(
        'inProgressRecipes', JSON.stringify({ [type]: { [id]: [] } }),
      ));
  }

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
