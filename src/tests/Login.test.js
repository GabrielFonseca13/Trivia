import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import { requestToken }from '../pages/Login';
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
    
    userEvent.type(inputName, 'Test Name');
    userEvent.type(inputEmail, 'test@email.com');
    userEvent.click(playButton);
    
    // act(() => {
      //   history.push()
      // });
      
      
      
      
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith(URL);
      
      const gameTitle = await screen.findByText(/game/i);
      expect(gameTitle).toBeInTheDocument();
      expect(history.location.pathname).toBe('/game');
      debug();
  });
});
