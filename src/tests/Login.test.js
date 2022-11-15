
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
 
describe('Testes da Página Login', () => {
 it('Teste se os componentes estao na tela', () => {
   renderWithRouterAndRedux(<App />);
 
   const allInputs = screen.getAllByRole('textbox');
 
   const inputName = allInputs[0];
   expect(inputName).toBeInTheDocument();
 
   const inputEmail = allInputs[1];
   expect(inputEmail).toBeInTheDocument();
 
   const playButton = screen.getByRole('button', { name: /play/i });
   expect(playButton).toBeInTheDocument();
   const settingsButton = screen.getByRole('button', { name: /configurações/i });
   expect(settingsButton).toBeInTheDocument();
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
 
 it('Teste se a requisição do token é feita corretamente e direciona para a página correta', async () => {
   const tokenMock = [
     {
       response_code: 0,
       response_message: 'Token Generated Successfully!',
       token: 'cea36ac377e32639bbd74418b19953aee3ef04d4dedfc49a162c690954914262',
     }
   ];
  
   global.fetch = jest.fn(() => Promise.resolve({
     json: () => Promise.resolve(tokenMock),
   }));
  
   const { history, debug } = renderWithRouterAndRedux(<App />);
  
   const URL = 'https://opentdb.com/api_token.php?command=request';
   expect(global.fetch).toBeCalledTimes(0);
   const {pathname} = history.location;
  
   const allInputs = screen.getAllByRole('textbox'); 
   const inputName = allInputs[0];
   const inputEmail = allInputs[1];
   const playButton = screen.getByRole('button', { name: /play/i });
 
   expect(pathname).toBe('/');
   const TEST_NAME = 'TEST_NAME';
   const TEST_EMAIL = 'TEST_EMAIL';
   userEvent.type(inputName, TEST_NAME);
   userEvent.type(inputEmail, TEST_EMAIL);
   userEvent.click(playButton);
 
   expect(global.fetch).toBeCalledTimes(1);
   expect(global.fetch).toBeCalledWith(URL);
    
   const gameTitle = await screen.findByText(TEST_NAME);
   expect(gameTitle).toBeInTheDocument();
   expect(history.location.pathname).toBe('/game');
   debug();
 });
 it('Verifica se o botão de configuração ao ser clicado direciona para a rota correta', async () => {
   const { history } = renderWithRouterAndRedux(<App />);
   const settingsButton = screen.getByRole('button', { name: /configurações/i });
   userEvent.click(settingsButton);
   screen.logTestingPlaygroundURL();
   const settingsTitle = await screen.getByRole('heading', {name: /Configurações/i});
   expect(settingsTitle).toBeInTheDocument();
   expect(history.location.pathname).toBe('/settings');
 });
});
