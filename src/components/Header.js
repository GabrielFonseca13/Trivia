import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  componentDidMount() {
    this.requestAvatar();
  }

  // Gera a url de uma picture se o usuario tiver cadastrado retorna uma picture
  // Salva os dados do usuario logado no localStorage
  requestAvatar = () => {
    const { name, score, emailUser } = this.props;
    const hash = md5(emailUser).toString();
    const dataUser = { name, score, picture: `https://www.gravatar.com/avatar/${hash}` };
    const dataRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    dataRanking.push(dataUser);
    localStorage.setItem('ranking', JSON.stringify(dataRanking));
  };

  render() {
    const { name, score, emailUser } = this.props;
    // const dataRanking = JSON.parse(localStorage.getItem('ranking')) || [];

    const hash = md5(emailUser).toString();

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          {name}
        </p>
        <p data-testid="header-score">
          {score}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  emailUser: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  emailUser: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
