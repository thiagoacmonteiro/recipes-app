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
