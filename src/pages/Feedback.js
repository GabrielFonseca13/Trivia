import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  clickPlayAgain = () => {
    const { history } = this.props;
    history.push('./');
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
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);

