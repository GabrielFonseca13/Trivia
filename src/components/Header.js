import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  componentDidMount() {
    this.requestAvatar();
  }

  // Faz uma requisição na API do gravatar se o usuario tiver
  // cadastrado retorna a url de uma picture
  requestAvatar = async () => {
    const { name, score } = this.props;
    const hash = md5('MyEmailAddress@example.com').toString();
    const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    const data = await response;
    const dataUser = { name, score, picture: data.url };
    const dataRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    dataRanking.push(dataUser);
    // Salva os dados do usuario logado no localStorage
    localStorage.setItem('ranking', JSON.stringify(dataRanking));
  };

  render() {
    const { name, score } = this.props;
    const dataRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const userData = dataRanking.find((user) => user.name === name);

    const avatar = (
      <img
        src={ userData.picture }
        alt="profile"
        data-testid="header-profile-picture"
      />
    );

    return (
      <header>
        {avatar}
        {/* { userData.picture.length === 0 ? null : avatar } */}
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
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
