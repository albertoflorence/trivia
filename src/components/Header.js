import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Star from './icons/Star';

class Header extends Component {
  render() {
    const { userName, avatar } = this.props;
    return (
      <header className="header">
        <div>
          <div className="header-profile">
            <img
              data-testid="header-profile-picture"
              alt="Avatar do usuário"
              src={ avatar }
            />
            <span data-testid="header-player-name">{userName}</span>
          </div>
          <div className="header-score">
            <Star />
            <span data-testid="header-score">Pontos: 0</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  userName: player.name,
  avatar: player.avatar,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
