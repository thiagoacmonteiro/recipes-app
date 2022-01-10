import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import exploreBgPage from '../images/explore-page.svg';

export default function Explore() {
  const history = useHistory();
  function handleClick({ target: { name } }) {
    history.push(`/explorar/${name}`);
  }

  return (
    <>
      <Header
        text="Explorar"
      />
      <div className="flex flex-col justify-center items-center mt-4">
        <button
          type="button"
          name="comidas"
          data-testid="explore-food"
          onClick={ handleClick }
          className="w-1/3 mx-2 bg-black text-lg font-bold
        text-white border-2 border-purple-900 rounded-md my-2 h-14
        hover:opacity-75 transition ease-in-out delay-150
        hover:-translate-y-1 hover:scale-105"
        >
          Explorar Comidas
        </button>

        <button
          type="button"
          name="bebidas"
          data-testid="explore-drinks"
          onClick={ handleClick }
          className="w-1/3 mx-2 bg-black text-lg font-bold
        text-white border-2 border-purple-900 rounded-md my-2 h-14
        hover:opacity-75 transition ease-in-out delay-150
        hover:-translate-y-1 hover:scale-105"
        >
          Explorar Bebidas
        </button>
      </div>
      <img
        src={ exploreBgPage }
        alt="explorando receitas"
        className="mt-2 w-5/6 mx-auto
        md:w-96"
      />
      <LowerMenu />
    </>
  );
}
