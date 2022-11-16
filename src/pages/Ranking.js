import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  clickLogin = () => {
    const { history } = this.props;
    history.push('./');
  };

  orderRanking = (a, b) => b.score - a.score;

  render() {
    const dataRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const ranking = dataRanking.sort(this.orderRanking);

    return (
      <div>
        <h1 data-testid="ranking-title">Rankings</h1>
        <div>
          {ranking.map((player, index) => {
            const { name, score, picture } = player;
            return (
              <div key={ index }>
                <img
                  src={ picture }
                  alt="profile"
                  data-testid="header-profile-picture"
                />
                <p data-testid={ `player-name-${index}` }>
                  {name}
                </p>
                <p data-testid={ `player-score-${index}` }>
                  {score}
                </p>
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          data-testid="btn-go-home"
          onClick={ this.clickLogin }
        >
          Voltar para tela inicial
        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
