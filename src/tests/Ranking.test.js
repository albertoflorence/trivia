import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import userEvent from '@testing-library/user-event';
import App from '../App';

const ranking = [
  { score: 50, name: '50 score', gravatarEmail: '50_score@mail.com' },
  { score: 10, name: '10 score', gravatarEmail: '10_score@mail.com' },
  { score: 100, name: '100 score', gravatarEmail: '100_score@mail.com' },
];
localStorage.setItem('ranking', JSON.stringify(ranking));

describe('<Ranking />', () => {
  it('O ranking deve ser renderizado em ordem por score', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');
    expect(screen.getByTestId('player-name-0')).toHaveTextContent('100 score');
    expect(screen.getByTestId('player-name-1')).toHaveTextContent('50 score');
    expect(screen.getByTestId('player-name-2')).toHaveTextContent('10 score');
  });
  it('O botão jogar novamente deve redirecionar o usuário para Home', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');
    const button = screen.getByTestId('btn-go-home');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  });
});
