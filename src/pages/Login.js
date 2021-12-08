import React, { useContext } from 'react';
import Context from '../contexts/Context';

export default function Login() {
  const { login, setLogin } = useContext(Context);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const regexForEmail = /\S+@\S+\.\S+/;
  const length = 6;
  const passwordIsValid = login.password.length > length;
  const emailIsValid = regexForEmail.test(login.email);

  const handleClick = () => {
  };

  return (
    <section>
      <input
        type="text"
        data-testid="email-input"
        name="email"
        value={ login.email }
        onChange={ handleChange }
      />
      <input
        type="text"
        data-testid="password-input"
        name="password"
        value={ login.password }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleClick }
        disabled={ !((passwordIsValid && emailIsValid === true)) }
      >
        Entrar
      </button>
    </section>
  );
}
