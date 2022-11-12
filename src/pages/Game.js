import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { insertScore } from '../redux/actions/userActions';
import './game.css';

class Game extends React.Component {
  state = {
    count: 30,
    questions: [],
    currentIndex: 0,
    allAsw: [],
    clicked: false,
    isDisabled: false,
    reStartTimer: true,
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

  changeState = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }), () => this.timeOver());
  };

  timeOver = () => {
    const { count } = this.state;
    this.setState({ isDisabled: count === 0 });
  };

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

  // função para saber se a resposta atual é a resposta certa
  isRightAnswer = (asw) => {
    const { questions, currentIndex } = this.state;
    return asw === questions[currentIndex].correct_answer;
  };

  numberOfHits = () => {
    const { dispatch } = this.props;
    const levels = { hard: 3, medium: 2, easy: 1 };
    const { questions, currentIndex, count } = this.state;
    const { difficulty } = questions[currentIndex];
    const num = 10;
    const score = num + (count * levels[difficulty]);
    dispatch(insertScore(score));
  };

  // função que muda o estado do cliked
  handleClick = (asw) => {
    this.setState({ clicked: true });
    if (this.isRightAnswer(asw)) {
      this.numberOfHits();
    }
  };

  // função que controla o botão para passar a proxima questão,
  // mudandando o estado da variável currentIndex
  handleNextQuestion = () => {
    const { history } = this.props;
    const { questions, currentIndex } = this.state;
    if (currentIndex === questions.length - 1) {
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      ...prevState,
      currentIndex: prevState.currentIndex + 1,
      count: 30,
      clicked: false,
      reStartTimer: false,
    }), () => {
      this.insertCorrectAnswr();
      this.setState({ reStartTimer: true });
    });
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

  // função para escolher a classe para aplicar nos botões
  selectClass = (asw) => (this.isRightAnswer(asw) ? 'right' : 'wrong');

  render() {
    const { questions, currentIndex, allAsw, clicked,
      isDisabled, count, reStartTimer } = this.state;

    return (
      <div className="game">
        <Header />
        {reStartTimer
        && <Timer
          conut={ count }
          clicked={ clicked }
          changeState={ this.changeState }
        />}
        {questions.length && (
          <div>
            <p data-testid="question-category">{questions[currentIndex].category}</p>
            <p data-testid="question-text">{questions[currentIndex].question}</p>
            <p>
              Timer:
              {' '}
              {count}
            </p>
            <div data-testid="answer-options">
              {/* desenvolvido pelo grupo */}
              {allAsw.map((asw, index) => (
                <button
                  type="button"
                  key={ index }
                  disabled={ isDisabled }
                  // se uma das opções forem clikadas faz a verificação de qual é a correta e aplica as classes css
                  className={ clicked ? this.selectClass(asw) : null }
                  data-testid={ this.isRightAnswer(asw)
                    ? 'correct-answer' : `wrong-answer-${index}` }
                  onClick={ () => this.handleClick(asw) }
                >
                  {asw}
                </button>
              ))}
              {isDisabled || clicked
                ? (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.handleNextQuestion }
                  >
                    Próxima Pergunta
                  </button>)
                : null}
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
