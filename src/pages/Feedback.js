import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div className="feedback">
        <Header />
        <p data-testid="feedback-text">Could be better...</p>
      </div>
    );
  }
}

export default Feedback;
