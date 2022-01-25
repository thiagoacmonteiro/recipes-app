import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtnDoneRecipes({ testId, id, type }) {
  const [copiedLink, setCopiedLink] = useState(false);

  function handleClick() {
    const url = `http://localhost:3000/${type}/${id}`;
    copy(url);
    setCopiedLink(true);
  }

  return (
    <div
      className="mb-3 bg-gray-300 p-2 rounded-xl h-12 w-12
    flex items-center justify-center"
    >
      { copiedLink ? (
        <p>Link copied!</p>
      ) : (
        <input
          data-testid={ testId }
          type="image"
          onClick={ handleClick }
          value="compartilhar"
          src={ shareIcon }
          alt="shareIcon"
        />)}
    </div>
  );
}

ShareBtnDoneRecipes.propTypes = {
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
