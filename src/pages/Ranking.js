import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Star from '../components/icons/Star';
import Logo from '../components/Logo';
import { getRanking, gravatarImage } from '../utils';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = getRanking();
    ranking.sort((a, b) => b.score - a.score);

    return (
      <div className="ranking">
        <div className="ranking-content">
          <Logo />
          <h2 data-testid="ranking-title">Ranking</h2>
          {ranking.map(({ score, name, gravatarEmail }, index) => (
            <div key={ index } className="ranking-item">
              <img src={ gravatarImage(gravatarEmail) } alt="imagem perfil" />
              <span data-testid={ `player-name-${index}` }>{name}</span>
              <div className="ranking-score">
                <Star />
                <strong>
                  <span data-testid={ `player-score-${index}` }>{score}</span>
                </strong>
                pontos
              </div>
            </div>
          ))}
          <button
            data-testid="btn-go-home"
            className="btn-again"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Ranking);
