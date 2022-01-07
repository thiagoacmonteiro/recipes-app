import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { HiAtSymbol, HiOutlineEye } from 'react-icons/hi';
import Context from '../contexts/Context';
import { setTokens, setUser } from '../services/localStorage';
import '../index.css';
import imgLogin from '../images/login_page.svg';

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
    <section
      className="
      flex items-center
      flex-col
      justify-center
      content-center
      bg-gray-800
      h-screen"
    >
      <img
        src={ imgLogin }
        alt="cozinheiro"
        className="opacity-7
        mt-2
        w-44"
      />
      <div
        className="
        flex
        content-center
        items-center
        justify-center
        align-super
        w-44
        my-2
        rounded-md
        bg-red-800
        "
      >
        <h1
          className="
          text-4xl
          text-center
          text-neutral-200"
        >
          DATA RECIPE APP
          {' '}

        </h1>
      </div>
      <div
        className="
        flex
        flex-col
        w-3/4
        content-center
        my-1"
      >
        <div>
          <HiAtSymbol
            className="z-50 border-solid border-2 border-blue-100
          absolute right-12 mt-1 rounded-r
            bg-gray-300 w-12 h-9 p-1.5"
          />
          <input
            className="
          mt-1  w-full px-3 py-2 bg-white border
          border-gray-300 rounded-md text-sm shadow-sm
          placeholder-gray-400   focus:outline-none
          focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          mx-3 my-1"
            type="text"
            data-testid="email-input"
            name="email"
            placeholder="email"
            value={ login.email }
            onChange={ handleChange }
          />
        </div>
        <div>
          <HiOutlineEye
            className="z-50 border-solid border-2 border-blue-100
            absolute right-12 mt-1 rounded-r
            bg-gray-300 w-12 h-9 p-1.5"
          />
          <input
            className="
          mt-1 block w-full px-3 py-2 bg-white border
          border-gray-300 rounded-md text-sm shadow-sm
          placeholder-gray-400   focus:outline-none
          focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          mx-3 my-1"
            type="text"
            data-testid="password-input"
            placeholder="Senha"
            name="password"
            value={ login.password }
            onChange={ handleChange }
          />

        </div>
        <button
          className="
          rounded-md bg-red-500
          disabled:bg-gray-500 opacity-7 bg-origin-padding
          focus-within:shadow-lg  w-full mx-3 mb-3 mt-2.5 px-3 py-2
          focus-visible:ring active:bg-red-700"
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
