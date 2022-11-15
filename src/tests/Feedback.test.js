import React from 'react';
import { screen , waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Feedback from '../pages/Feedback';
import { act } from 'react-dom/test-utils';
 
describe('Testes da Página Feedback', () => {
  it('Teste se os componentes estao na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const profilePicture = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const playerScore = screen.getByTestId('header-player-name');
    const payerAsserts = screen.getByTestId('feedback-total-question')

    const feedbackMsg = screen.getByTestId('feedback-text');
    expect(feedbackMsg).toBeInTheDocument();

    expect(profilePicture).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();
    expect(payerAsserts).toBeInTheDocument();

    const playAgainBtn = screen.getByRole('button', {name: /Play Again/i});
    const rankingButton = screen.getByRole('button', {name: /Ranking/i });
    
    expect(playAgainBtn).toBeInTheDocument();
    expect(rankingButton).toBeInTheDocument();
  });
  it('Teste se o botão Play Again faz o direcionamento correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/feedback');
    });
    const playAgainBtn = screen.getByRole('button', {name: /Play Again/i});
    expect(playAgainBtn).toBeInTheDocument();
    userEvent.click(playAgainBtn);
    expect(playAgainBtn).not.toBeInTheDocument()
    const { location: {pathname}} = history;
        expect(pathname).toBe('/');
  });
  it('Teste se o botão Ranking faz o direcionamento correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/feedback');
    });
    const rankingButton = screen.getByRole('button', {name: /Ranking/i });
    expect(rankingButton).toBeInTheDocument();
    userEvent.click(rankingButton);
    const { location: {pathname}} = history;
    expect(pathname).toBe('/ranking');
  });
  
  it('Teste se é renderizada a mensagem Well Done quando os assertions forem maiores ou iguais a 3', () => {

  });
  it('Teste se é renderizada a mensagem Could be better ... quando os assertions forem menores que 3', () => {

  });

});
