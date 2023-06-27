import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feedback from "../pages/Feedback";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testes da tela de Feedback', () => {
  it('A página de Feedback deve ser renderizada', () => {
    renderWithRouterAndRedux(<Feedback />);
    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    const btnRanking = screen.getByTestId('btn-ranking');
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackTotalQuestion).toBeInTheDocument();
    expect(feedbackTotalScore).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  });

  it('O botão Play Again deve redirecionar o jogador para a tela de Login', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    userEvent.click(btnPlayAgain)
    expect(history.location.pathname).toBe('/');
  });

  it('O botão de Ranking deve redicionar o jogador para a tela de Ranking', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnRanking = screen.getByTestId('btn-ranking');
    userEvent.click(btnRanking)
    expect(history.location.pathname).toBe('/ranking');
  });
});