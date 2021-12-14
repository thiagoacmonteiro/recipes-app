export function setTokens() {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
}

export function setUser(loginData) {
  localStorage.setItem('user', JSON.stringify(loginData));
}

export function getUser() {
  const user = localStorage.getItem('user');
  return JSON.parse(user).email;
}
