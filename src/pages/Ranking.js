import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  clickLogin = () => {
    const { history } = this.props;
    history.push('./');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Rankings</h1>
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
