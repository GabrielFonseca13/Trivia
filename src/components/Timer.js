import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  state = {
    count: 30,
    idInterval: 0,
  };

  componentDidMount() {
    this.initTimer();
  }

  componentDidUpdate() {
    const { count } = this.state;
    const { handleTimer } = this.props;
    console.log(count);
    if (count === 0) {
      handleTimer(true);
    }
  }

  changeState = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };

  changeTimer = () => {
    const interval = 1000;
    const idInterval = setInterval(() => this.changeState(), interval);
    this.setState({ idInterval });
    console.log(idInterval);
    const intervalToEnd = 30000;
    setTimeout(() => clearInterval(idInterval), intervalToEnd);
  };

  initTimer = () => {
    const intervalToInit = 5000;
    setTimeout(
      () => this.changeTimer(),
      intervalToInit,
    );
  };

  render() {
    const { count, idInterval } = this.state;
    const { clicked } = this.props;

    if (clicked) clearInterval(idInterval);

    return (
      <p>
        Timer:
        {' '}
        <span>{count}</span>
      </p>
    );
  }
}

Timer.propTypes = {
  clicked: PropTypes.bool.isRequired,
  handleTimer: PropTypes.func.isRequired,
};

export default Timer;
