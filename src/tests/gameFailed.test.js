import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Game from '../pages/Game';
import {tokenFailed} from './Mocks/tokenFailedMock';
import {questionsFailed} from './Mocks/questionsFailedMock';
import { act } from 'react-dom/test-utils';


const TEST_NAME = 'TESTE NAME';
const TEST_EMAIL = 'teste@teste.com';

it('verificar se quando a API não responde o game não inicia', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(tokenFailed).mockResolvedValue(questionsFailed),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    
    const allInputs = screen.getAllByRole('textbox');
    const inputName = allInputs[0];
    const inputEmail = allInputs[1];
    const playButton = screen.getByRole('button', { name: /play/i });
  
    userEvent.type(inputName, TEST_NAME);
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.click(playButton);

    const {pathname} = history.location;
    expect(pathname).toBe('/');
    act(() => {
      history.push('/game');
    });
    expect(pathname).toBe('/');
});