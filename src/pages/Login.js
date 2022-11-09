import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

export default connect()(Login);
