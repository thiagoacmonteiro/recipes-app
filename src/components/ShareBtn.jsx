import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn({ testId }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const location = useLocation();

  function handleClick() {
    const url = `http://localhost:3000${location.pathname}`.split('/in');
    console.log(url[0]);
    copy(url[0]);
    setCopiedLink(true);
  }

  return (
    <div>
      { copiedLink && (
        <p>Link copiado!</p>
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
  testId: PropTypes.string.isRequired,
};
