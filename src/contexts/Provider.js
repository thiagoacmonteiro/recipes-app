import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [resultFetch, setResultFetch] = useState([]);
  const [categoryFetch, setCategoryFetch] = useState([]);
  const [clicked, setClicked] = useState({
    clickBtn: false,
    nameBtn: '',
  });

  const contextValue = {
    login,
    setLogin,
    resultFetch,
    setResultFetch,
    categoryFetch,
    setCategoryFetch,
    clicked,
    setClicked,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
