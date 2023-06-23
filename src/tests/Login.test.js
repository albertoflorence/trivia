import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes da página Login', () => {
  it('A página de login deve ser renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const userName = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(history.location.pathname).toBe('/');
    expect(userName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
  });
  it('Testes do botão de play', () => {
    renderWithRouterAndRedux(<App />);
    const userName = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeDisabled();
    userEvent.type(userName, 'Teste');
    userEvent.type(email, 'teste@teste.com');
    expect(buttonPlay).toBeEnabled();
    userEvent.click(buttonPlay);
  });
  it('O token deve estar salvo no localStorage', async () => {
    renderWithRouterAndRedux(<App />);
    await waitFor(() => {
      expect(localStorage.getItem('token')).not.toBeNull();
    })
  })
  it('Teste do botão de settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');
    userEvent.click(buttonSettings);
    expect(history.location.pathname).toBe('/settings');
  });
});