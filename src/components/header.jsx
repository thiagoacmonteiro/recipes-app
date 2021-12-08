import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import '../styles/Header.css';

export default function Header({ searchIcon, text }) {
  return (
    <div className="header-container">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </Link>
      <div data-testid="page-title">{ text }</div>
      { searchIcon
      && <img
        src={ searchIcon }
        alt="searchIcon"
        data-testid="search-top-btn"
      />}
    </div>
  );
}

Header.propTypes = {
  searchIcon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
