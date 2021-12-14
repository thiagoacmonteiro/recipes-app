import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { getUser } from '../services/localStorage';

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
    <div>
      <Header
        text="Perfil"
      />
      <p data-testid="profile-email">
        { getUser() }
      </p>
      <button
        type="button"
        name="done"
        data-testid="profile-done-btn"
        onClick={ handleClick }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        name="favorite"
        data-testid="profile-favorite-btn"
        onClick={ handleClick }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        name="logout"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Sair
      </button>
      <LowerMenu />
    </div>
  );
}
