import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import FilterForm from './FilterForm';

export default function Header({ searchIcon, text }) {
  const [canRenderSearchInput, setCanRenderSearchInput] = useState(false);

  function renderSearchInput() {
    setCanRenderSearchInput(!canRenderSearchInput);
  }

  return (
    <div className="bg-purple-600 w-screen flex items-center flex-col">
      <div className="flex my-2 justify-around w-full items-center">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h2 className="text-white font-bold" data-testid="page-title">{text}</h2>
        {searchIcon && (
          <button
            onClick={ renderSearchInput }
            type="button"
            className="focus:outline-none"
          >
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        )}
      </div>
      <div className="bg-white w-full flex justify-center">
        {
          canRenderSearchInput && <FilterForm />
        }
      </div>
    </div>
  );
}

Header.propTypes = {
  searchIcon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
