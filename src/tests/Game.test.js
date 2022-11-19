import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Game from '../pages/Game';
import {questionsMock} from './Mocks/questionsMock';
import {tokenMock} from './Mocks/tokenMock';

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValueOnce(tokenMock).mockResolvedValue(questionsMock),
  });
});

afterEach(() => {
 jest.clearAllMocks();
});

const TEST_NAME = 'TESTE NAME';
const TEST_EMAIL = 'teste@teste.com';

describe('Testes da Página Game', () => {
  
  it('verificar se os elementos o Header estao renderizados na tela', async () => {
    renderWithRouterAndRedux(<Game />);
    const profilePicture = screen.getByTestId("header-profile-picture");
    expect(profilePicture).toBeInTheDocument();
    const playerName = screen.getByTestId("header-player-name");
    expect(playerName).toBeInTheDocument();
    const playerScore = screen.getByTestId("header-score");
    expect(playerScore).toBeInTheDocument();
  });
  
  it('verifica se as perguntas sao renderizadas na tela', async () => {
    renderWithRouterAndRedux(<App />);
    
    const allInputs = screen.getAllByRole('textbox');
    const inputName = allInputs[0];
    const inputEmail = allInputs[1];
    const playButton = screen.getByRole('button', { name: /play/i });
    
    expect(global.fetch).toHaveBeenCalledTimes(0);
  
    userEvent.type(inputName, TEST_NAME);
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.click(playButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);  

    await waitFor(() => {
      expect(screen.getByTestId("question-category")).toBeInTheDocument();
    })
    
    const correctAnswer1 = screen.getByTestId('correct-answer');
    expect(correctAnswer1).toBeInTheDocument();
    userEvent.click(correctAnswer1);
    const nextQuestionButton1 = screen.getByRole('button', {name: /Próxima pergunta/i});
    userEvent.click(nextQuestionButton1);

    const correctAnswer2 = screen.getByTestId('correct-answer');
    expect(correctAnswer2).toBeInTheDocument();
    userEvent.click(correctAnswer2);
    const nextQuestionButton2 = screen.getByRole('button', {name: /Próxima pergunta/i});
    userEvent.click(nextQuestionButton2);

    const correctAnswer3 = screen.getByTestId('correct-answer');
    expect(correctAnswer3).toBeInTheDocument();
    userEvent.click(correctAnswer3);
    const nextQuestionButton3 = screen.getByRole('button', {name: /Próxima pergunta/i});
    userEvent.click(nextQuestionButton3);

    const correctAnswer4 = screen.getByTestId('correct-answer');
    expect(correctAnswer4).toBeInTheDocument();
    userEvent.click(correctAnswer4);
    const nextQuestionButton4 = screen.getByRole('button', {name: /Próxima pergunta/i});
    userEvent.click(nextQuestionButton4);

    const correctAnswer5 = screen.getByTestId('correct-answer');
    expect(correctAnswer5).toBeInTheDocument();
    userEvent.click(correctAnswer5);
    const nextQuestionButton5 = screen.getByRole('button', {name: /Próxima pergunta/i});
    userEvent.click(nextQuestionButton5);
    
    await waitFor(() => {
      expect(screen.getByText(/Well Done!/i).toBeInTheDocument);
    })
  });

  it('Teste se o contador funciona', async () => {
    renderWithRouterAndRedux(<App />);
    
    const allInputs = screen.getAllByRole('textbox');
    const inputName = allInputs[0];
    const inputEmail = allInputs[1];
    const playButton = screen.getByRole('button', { name: /play/i });
    
    expect(global.fetch).toHaveBeenCalledTimes(0);
  
    userEvent.type(inputName, TEST_NAME);
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.click(playButton);

    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'setInterval');

    await waitFor(() => {
      expect(screen.getByTestId("question-category")).toBeInTheDocument();
    });

    expect(setTimeout).toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(setInterval).toHaveBeenCalled();

    const questionButton = screen.getByRole('button', {name: /Nine/i});
    expect(questionButton).toBeInTheDocument();
    expect(questionButton).not.toBeDisabled();

    const countTimer = screen.getByText('Timer: 30');
    expect(countTimer).toBeInTheDocument();

    userEvent.click(questionButton);
    const countTimer2 = screen.getByText('Timer: 29');
    expect(countTimer2).toBeInTheDocument();
    const score = screen.getByText('100');
    expect(score).toBeInTheDocument();
  });
});