import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Star from '../components/icons/Star';
import { getRanking } from '../utils';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = getRanking();
    console.log(ranking);
    ranking.sort((a, b) => b.score - a.score);
    console.log(ranking);

    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {ranking.map(({ score, name, gravatarEmail }, index) => (
          <div key={ index }>
            <img src={ gravatarEmail } alt="imagem perfil" />
            <span data-testid={ `player-name-${index}` }>{name}</span>
            <div>
              <Star />
              <span data-testid={ `player-score-${index}` }>{score}</span>
            </div>
          </div>

        ))}
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Ranking);
