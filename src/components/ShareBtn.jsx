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
    <div>
      { copiedLink && (
        <p>Link copiado!</p>
      ) }
      <input
        data-testid={ testId }
        type="image"
        onClick={ handleClick }
        value="compartilhar"
        src={ shareIcon }
        alt="shareIcon"
      />
    </div>
  );
}

ShareBtn.propTypes = {
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
