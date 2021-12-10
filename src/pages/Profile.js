import React from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function Profile() {
  return (
    <div>
      <Header
        text="Perfil"
      />
      <p> Profile </p>
      <LowerMenu />
    </div>
  );
}
