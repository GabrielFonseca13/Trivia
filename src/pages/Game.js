import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    questions: [],
    currentIndex: 0,
    allAsw: [],
  };

  // ao carregar o componente busca na api as questões e põe no estado do componente
  async componentDidMount() {
    const { history } = this.props;
    const questions = await this.getQuestions();
    if (questions.response_code) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ questions: questions.results }, () => this.insertCorrectAnswr());
  }

  // função que pega o token do localStorage
  getToken = () => localStorage.getItem('token');

  // função que busca os dados na api
  getQuestions = async () => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${this.getToken()}`);
    const data = await response.json();
    return data;
  };

  // embaralha o array
  ramdomArray = (lista) => {
    // Referencia http://cangaceirojavascript.com.br/como-embaralhar-arrays-algoritmo-fisher-yates/
    for (let indice = lista.length; indice; indice -= 1) {
      const indiceAleatorio = Math.floor(Math.random() * indice);

      // atribuição via destructuring
      [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio],
        lista[indice - 1]];
    }

    return lista;
  };

  insertCorrectAnswr = () => {
    // desenvolvido pelo grupo
    const { questions, currentIndex } = this.state;
    const atualQuestion = questions[currentIndex];

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = atualQuestion;

    const allAsw = [...incorrectAnswers, correctAnswer];

    this.setState({
      allAsw: this.ramdomArray(allAsw),
    });
  };

  render() {
    const { questions, currentIndex, allAsw } = this.state;

    return (
      <div>
        <Header />
        {questions.length && (
          <div>
            <p data-testid="question-category">{questions[currentIndex].category}</p>
            <p data-testid="question-text">{questions[currentIndex].question}</p>
            <div data-testid="answer-options">
              {/* desenvolvido pelo grupo */}
              {allAsw.map((asw, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ asw === questions[currentIndex].correct_answer
                    ? 'correct-answer' : `wrong-answer-${index}` }
                >
                  {asw}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
