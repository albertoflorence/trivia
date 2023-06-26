import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gravatarImage } from '../utils';

class Feedback extends Component {
  render() {
    console.log('oi');
    const { name, score, gravatarEmail, assertions } = this.props;
    const number = 3;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatarImage(gravatarEmail) }
          alt="imagem perfil"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        {assertions < number && <p data-testid="feedback-text">Could be better...</p>}
        {assertions >= number && <p data-testid="feedback-text">Well Done!</p>}
        <p
          data-testid="feedback-total-score"
        >
          {score}

        </p>
        <p
          data-testid="feedback-total-question"
        >
          {assertions}

        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
