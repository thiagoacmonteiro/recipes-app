import React, { useState } from 'react';
import { useLocation } from 'react-router';
import copy from 'clipboard-copy';

export default function ShareBtn() {
  const [copiedLink, setCopiedLink] = useState(false);

  const location = useLocation();
  console.log(location);

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
      >
        Compartilhar
      </button>
    </div>
  );
}
