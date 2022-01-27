import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Verifica se existe:', () => {
  render(<App />);

  // verifica se tem um h1 com o texto DATA RECIPE APP
  // verifica se existe 2 inputs um de e-mail e outro de password
  // verifica se existe 1 botão na tela com o texto entrar.
  // verifica se existe validação no input de e-mail
  // verifca se existe validação no input de senha
  // verifica se o botão continua desabilidatado se a validação não for concluida
  // verifica se ao clicar no botão mudamos para a rota X
  const linkElement = screen.getByText(/DATA RECIPE APP/i);
  expect(linkElement).toBeInTheDocument();
});
