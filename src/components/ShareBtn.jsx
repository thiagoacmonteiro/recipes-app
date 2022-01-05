import React, { useState } from 'react';
import { useLocation } from 'react-router';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn() {
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
