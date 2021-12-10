import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import '../styles/Header.css';
import FilterForm from './FilterForm';

export default function Header({ searchIcon, text }) {
  const [canRenderSearchInput, setCanRenderSearchInput] = useState(false);

  function renderSearchInput() {
    setCanRenderSearchInput(!canRenderSearchInput);
  }

  return (
    <div className="header-container">
      <div className="header-content">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </Link>
        <div data-testid="page-title">{text}</div>
        {searchIcon && (
          <button onClick={ renderSearchInput } type="button" className="search-btn">
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        )}
      </div>
      <div className="search-bar">
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
