export async function fetchIngredients(ingrediente, type) {
  const request = await fetch(
    `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  );

  const response = await request.json();

  return response;
}

export async function fetchByName(name, type) {
  const request = await fetch(
    `https://www.the${type}db.com/api/json/v1/1/search.php?s=${name}`,
  );

  const response = await request.json();

  return response;
}

export async function fetchByFirstLetter(letter, type) {
  const request = await fetch(
    `https://www.the${type}db.com/api/json/v1/1/search.php?f=${letter}`,
  );

  const response = await request.json();

  return response;
}
