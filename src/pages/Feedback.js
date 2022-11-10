import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const averageAnswers = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">Valor final provisorio</p>
        <p data-testid="feedback-total-question"> Quantidade de respostas acertadas</p>
        {rightAnswers >= averageAnswers ? <p data-testid="feedback-text">Well Done!</p>
          : <p ata-testid="feedback-text">Could be better...</p>}
      </div>
    );
  }
}

export default connect()(Feedback);
