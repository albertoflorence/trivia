import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { fetchQuestions } from '../services';
import { logout as actionLogout } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    questionNumber: 0,
    userAnswers: {},
  };

  async componentDidMount() {
    const { logout, history } = this.props;
    try {
      const token = localStorage.getItem('token');
      const questions = await fetchQuestions(token);
      this.setState({ questions });
    } catch (error) {
      logout();
      history.push('/');
    }
  }

  handleAnswerClick = (answerIndex) => {
    const { userAnswers, questionNumber } = this.state;
    this.setState({
      userAnswers: {
        ...userAnswers,
        [questionNumber]: answerIndex,
      },
    });
  };

  getCurrentQuestion = () => {
    const { questions, questionNumber } = this.state;
    return questions[questionNumber];
  };

  answerClassName(index, correctAnswer) {
    const { questionNumber, userAnswers } = this.state;
    const userAnswer = userAnswers[questionNumber];
    if (userAnswer === undefined) return '';
    return index === correctAnswer ? 'correct-answer' : 'wrong-answer';
  }

  renderQuestion = (data) => {
    if (!data) return null;
    const { category, question, answers, correctAnswerIndex } = data;

    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options" className="answer-options">
          {answers.map((answer, index) => (
            <button
              key={ answer }
              data-testid={
                correctAnswerIndex === index ? 'correct-answer' : `wrong-answer-${index}`
              }
              onClick={ () => this.handleAnswerClick(index, correctAnswerIndex) }
              className={ this.answerClassName(index, correctAnswerIndex) }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <Header />
        {this.renderQuestion(this.getCurrentQuestion())}
      </>
    );
  }
}

const mapDispatchToProps = {
  logout: actionLogout,
};

export default connect(null, mapDispatchToProps)(Game);

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  logout: PropTypes.func.isRequired,
};
