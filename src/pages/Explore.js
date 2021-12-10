import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function Explore() {
  const history = useHistory();
  function handleClick({ target: { name } }) {
    history.push(`/explorar/${name}`);
  }

  return (
    <div>
      <Header
        text="Explorar"
      />
      <p>Explore </p>
      <button
        type="button"
        name="comidas"
        data-testid="explore-food"
        onClick={ handleClick }
      >
        Explorar Comidas
      </button>

      <button
        type="button"
        name="bebidas"
        data-testid="explore-drinks"
        onClick={ handleClick }
      >
        Explorar Bebidas
      </button>
      <LowerMenu />
    </div>
  );
}
