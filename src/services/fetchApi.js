export async function fetchIngredients(ingrediente) {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  );

  const response = await request.json();

  return response;
}

export async function fetchByName(name) {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
  );

  const response = await request.json();

  return response;
}

export async function fetchByFirstLetter(letter) {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
  );

  const response = await request.json();

  return response;
}
