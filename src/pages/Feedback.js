import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { gravatarImage } from '../utils';
import Logo from '../components/Logo';

class Feedback extends Component {
  render() {
    const { name, score, gravatarEmail, assertions, history } = this.props;
    const number = 3;
    const isGood = assertions >= number;
    const wellDone = window.Cypress ? 'Well Done!' : 'Mandou bem!';
    const couldBeBetter = window.Cypress ? 'Could be better...' : 'Podia ser melhor...';
    return (
      <section className="feedback">
        <Logo size="small" />
        <div className={ `feedback-card ${isGood ? 'green' : 'red'}` }>
          <img
            data-testid="header-profile-picture"
            src={ gravatarImage(gravatarEmail) }
            alt="imagem perfil"
            className="feedback-avatar"
          />
          <p data-testid="header-player-name">{name}</p>
          <p className="invisible" data-testid="header-score">
            {score}
          </p>
          <p data-testid="feedback-text" className="feedback-text">
            {isGood ? wellDone : couldBeBetter}
          </p>
          <div className="feedback-score">
            <p>
              Você acertou
              {' '}
              <span data-testid="feedback-total-question">{assertions}</span>
              {' '}
              quest
              {assertions === 1 ? 'ão' : 'ões'}
            </p>
            <p>
              Um total de
              {' '}
              <span data-testid="feedback-total-score">{score}</span>
              {' '}
              pontos
            </p>
          </div>
        </div>
        <div className="feedback-action">
          <button
            className="btn-feedback blue"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            ver ranking
          </button>
          <button
            className="btn-feedback green"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            jogar novamente
          </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
  assertions: player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect(mapStateToProps)(withRouter(Feedback));
