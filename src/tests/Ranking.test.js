import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('Teste da Página de Ranking', () => {
  it('Testa se os elementos estao na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('./ranking');
    });
    const rankingTitle = screen.getByRole('heading', {name: /Rankings/i });
    expect(rankingTitle).toBeInTheDocument();
    const {location: {pathname}} = history;
    expect(pathname).toBe('/ranking');
    const backHomeButton = screen.getByRole('button', {Name: /Voltar para tela inicial/i});
    expect(backHomeButton).toBeInTheDocument();
  });
  it('Testa se o botão faz o direcionamento correto.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('./ranking');
    });
    const backHomeButton = screen.getByRole('button', {Name: /Voltar para tela inicial/i});
    expect(backHomeButton).toBeInTheDocument();
    userEvent.click(backHomeButton);
    expect(history.location.pathname).toBe('/');
  });
});