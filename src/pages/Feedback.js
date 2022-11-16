import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { loginUser } from '../redux/actions/userActions';

class Feedback extends React.Component {
  componentDidMount() {
    this.saveDataUser();
  }

  // Gera a url de uma picture se o usuario tiver cadastrado retorna uma picture
  // Salva os dados do usuario logado no localStorage
  saveDataUser = () => {
    const { name, score, emailUser } = this.props;
    const hash = md5(emailUser).toString();
    const dataUser = { name, score, picture: `https://www.gravatar.com/avatar/${hash}` };
    const dataRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    dataRanking.push(dataUser);
    localStorage.setItem('ranking', JSON.stringify(dataRanking));
  };

  clickPlayAgain = () => {
    const { history, dispatch, name, emailUser } = this.props;
    history.push('./');
    const objUser = {
      name,
      email: emailUser,
    };
    dispatch(loginUser(objUser));
  };

  clickRanking = () => {
    const { history } = this.props;
    history.push('./ranking');
  };

  render() {
    const { score, assertions } = this.props;
    const averageAnswers = 3;
    return (
      <div className="feedback">
        <Header />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        {assertions >= averageAnswers ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <button
          type="submit"
          data-testid="btn-play-again"
          onClick={ this.clickPlayAgain }
        >
          Play Again

        </button>
        <button
          type="submit"
          data-testid="btn-ranking"
          onClick={ this.clickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  emailUser: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  emailUser: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
