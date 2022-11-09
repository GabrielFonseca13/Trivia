import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  validatorButton = () => {
    const { name, email } = this.state;
    const validatorName = name.length > 0;
    const validatorEmail = email.length > 0;
    return validatorEmail && validatorName;
  };

  onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  clickSettings = () => {
    const { history } = this.props;
    history.push('./settings');
  };

  // função que faz o feth do token na API
  requestToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const objUser = { name, email };
    dispatch(loginUser(objUser));
    await this.requestToken();
    history.push('/game');
  };

  render() {
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          placeholder="Nome"
          name="name"
          onChange={ this.onHandleChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          placeholder="Email"
          name="email"
          onChange={ this.onHandleChange }
        />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !this.validatorButton() }
          onClick={ this.handleClick }
        >
          Play

        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.clickSettings }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
