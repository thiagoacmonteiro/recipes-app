import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Context from '../contexts/Context';
import { setTokens, setUser } from '../services/localStorage';
import '../styles/login.css';

export default function Login() {
  const { login, setLogin } = useContext(Context);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const regexForEmail = /\S+@\S+\.\S+/;
  const length = 6;
  const passwordIsValid = login.password.length > length;
  const emailIsValid = regexForEmail.test(login.email);

  const handleClick = () => {
    setTokens();
    setUser({ email: login.email });
    history.push('/comidas');
  };

  return (
    <section className="container-app">
      <div className="title-app">
        <h1>DATA RECIPE APP </h1>
      </div>
      <div className="container-inputs-login">
        <input
          className="input-email"
          type="text"
          data-testid="email-input"
          name="email"
          value={ login.email }
          onChange={ handleChange }
        />
        <input
          className="input-password"
          type="text"
          data-testid="password-input"
          name="password"
          value={ login.password }
          onChange={ handleChange }
        />
      </div>
      <div className="container-btn-login">
        <button
          className="style-login-btn"
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ !((passwordIsValid && emailIsValid === true)) }
        >
          Entrar
        </button>
      </div>
    </section>
  );
}
