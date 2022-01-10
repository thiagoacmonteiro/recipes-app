import React from 'react';
import { useHistory } from 'react-router';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function LowerMenu() {
  const history = useHistory();
  function handleClick({ target: { name } }) {
    history.push(`/${name}`);
  }

  return (
    <footer data-testid="footer">
      <div className="w-screen flex justify-around">
        <button
          type="button"
          name="comidas"
          onClick={ handleClick }
          className="transition ease-in-out delay-150
        hover:-translate-y-1 hover:scale-105 cursor-pointer hover:opacity-60"
        >
          <img
            name="comidas"
            src={ mealIcon }
            alt="Meal-Icon"
            data-testid="food-bottom-btn"
          />
        </button>
        <button
          type="button"
          name="explorar"
          onClick={ handleClick }
          className="transition ease-in-out delay-150
        hover:-translate-y-1 hover:scale-105 cursor-pointer hover:opacity-60"
        >
          <img
            name="explorar"
            src={ exploreIcon }
            alt="Explore-Icon"
            data-testid="explore-bottom-btn"
          />
        </button>
        <button
          type="button"
          name="bebidas"
          onClick={ handleClick }
          className="transition ease-in-out delay-150
        hover:-translate-y-1 hover:scale-105 cursor-pointer hover:opacity-60"
        >
          <img
            name="bebidas"
            src={ drinkIcon }
            alt="Drink-Icon"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </div>
    </footer>
  );
}
