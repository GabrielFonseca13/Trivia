import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes da Página Login', () => {
  it('Teste se os componentes estao na tela', () => {
    renderWithRouterAndRedux(<App />);

    const allInputs = screen.getAllByRole('textbox');
    // console.log(allInputs);

    const inputName = allInputs[0];
    expect(inputName).toBeInTheDocument();

    const inputEmail = allInputs[1];
    expect(inputEmail).toBeInTheDocument();
  });

  it('Teste se os componentes funcionam', () => {
    renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    const allInputs = screen.getAllByRole('textbox');
    const inputName = allInputs[0];
    expect(inputName).toHaveTextContent('');
    const inputEmail = allInputs[1];
    expect(inputEmail).toHaveTextContent('');

    userEvent.type(inputName, 'Test Name');
    userEvent.type(inputEmail, 'test@email.com');

    expect(inputName).toHaveValue('Test Name');
    expect(inputEmail).toHaveValue('test@email.com');
    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);
  });
});
