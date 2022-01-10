import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { getUser } from '../services/localStorage';
import chefPerfil from '../images/chef-img-profile.svg';

export default function Profile() {
  const history = useHistory();

  function handleClick(event) {
    const { target: { name } } = event;
    switch (name) {
    case 'done':
      history.push('/receitas-feitas');
      break;
    case 'favorite':
      history.push('/receitas-favoritas');
      break;
    case 'logout':
      localStorage.clear();
      history.push('/');
      break;
    default:
      console.error('Nome não encontrado');
    }
  }

  return (
    <>
      <Header
        text="Perfil"
      />
      <p
        data-testid="profile-email"
        className="bg-gray-800 text-white
        text-center font-bold py-2"
      >
        { getUser() }
      </p>
      <div className=" flex flex-col items-center justify-center gap-2 font-bold">
        <button
          type="button"
          name="done"
          data-testid="profile-done-btn"
          onClick={ handleClick }
          className="w-2/4 bg-black text-lg font-bold
          text-white border-2 border-purple-900 rounded-md my-2 h-10
          hover:opacity-75 transition ease-in-out delay-150
          hover:-translate-y-1 hover:scale-105"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          name="favorite"
          data-testid="profile-favorite-btn"
          onClick={ handleClick }
          className="w-2/4 bg-black text-lg font-bold
          text-white border-2 border-purple-900 rounded-md my-2 h-10
          hover:opacity-75 transition ease-in-out delay-150
          hover:-translate-y-1 hover:scale-105"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          name="logout"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
          className="w-2/4 bg-black text-lg font-bold
          text-white border-2 border-purple-900 rounded-md my-2 h-10
          hover:opacity-75 transition ease-in-out delay-150
          hover:-translate-y-1 hover:scale-105"
        >
          Sair
        </button>
      </div>
      <img
        src={ chefPerfil }
        alt="imagem-perfil"
        className="mt-2 sm:w-44 mx-auto
        md:w-96"
      />
      <LowerMenu />
    </>
  );
}
