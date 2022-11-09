import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src="https://www.imagensempng.com.br/wp-content/uploads/2021/02/Ponto-Interrogacao-Png-1024x1024.png"
          alt="Imagem do Player"
        />
        <h5 data-testid="header-player-name">Provisorio</h5>
        <p data-testid="header-score">Pontuação provisoria</p>
      </div>
    );
  }
}

export default Header;
