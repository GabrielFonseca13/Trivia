import React from 'react';
import { connect } from 'react-redux';

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
      </div>
    );
  }
}

export default connect()(Login);
