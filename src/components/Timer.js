import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  state = {
    idInterval: 0,
  };

  componentDidMount() {
    this.initTimer();
  }

  componentDidUpdate() {
    const { handleTimer, count } = this.props;
    if (count === 0) {
      handleTimer(true);
    }
  }

  changeTimer = () => {
    const { changeState } = this.props;
    const interval = 1000;
    const idInterval = setInterval(() => changeState(), interval);
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
    const { idInterval } = this.state;
    const { clicked } = this.props;

    if (clicked) clearInterval(idInterval);

    return (<div />);
  }
}

Timer.propTypes = {
  clicked: PropTypes.bool.isRequired,
  handleTimer: PropTypes.func.isRequired,
};

export default Timer;
