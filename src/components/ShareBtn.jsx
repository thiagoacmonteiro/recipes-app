import React, { useState } from 'react';
import { useLocation } from 'react-router';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn() {
  const [copiedLink, setCopiedLink] = useState(false);

  const location = useLocation();

  function handleClick() {
    copy(`http://localhost:3000${location.pathname}`);
    setCopiedLink(true);
  }

  return (
    <div>
      { copiedLink && (
        <p>Link copiado!</p>
      ) }
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleClick }
        value="compartilhar"
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
    </div>
  );
}
