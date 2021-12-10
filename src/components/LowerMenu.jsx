import React from 'react';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function LowerMenu() {
  return (
    <footer data-testid="footer">
      <div className="button-container">
        <button type="button">
          <img src={ mealIcon } alt="Meal-Icon" data-testid="food-bottom-btn" />
        </button>
        <button type="button">
          <img src={ exploreIcon } alt="Explore-Icon" data-testid="explore-bottom-btn" />
        </button>
        <button type="button">
          <img src={ drinkIcon } alt="Drink-Icon" data-testid="drinks-bottom-btn" />
        </button>
      </div>
    </footer>
  );
}
