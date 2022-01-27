import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn({ testId, id, type }) {
  const [copiedLink, setCopiedLink] = useState(false);

  function handleClick() {
    const url = `http://localhost:3000/${type}/${id}`;
    copy(url);
    setCopiedLink(true);
  }

  return (
    <div
      className="m-4 bg-gray-300 p-2 rounded-xl h-12 w-12
    flex items-center justify-center"
    >
      { copiedLink && (
        <p>Link copied!</p>
      ) }
      <button
        data-testid={ testId }
        type="button"
        onClick={ handleClick }
        value="compartilhar"
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
    </div>
  );
}

ShareBtn.propTypes = {
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
