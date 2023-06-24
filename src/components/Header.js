import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userName, avatar } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="Avatar do usuário"
          src={ avatar }
        />
        <span data-testid="header-player-name">{userName}</span>
        <span data-testid="header-score">0</span>
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
