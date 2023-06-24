import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { fetchQuestions } from '../services';
import { logout as actionLogout, answer as actionAnswer } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    questionNumber: 0,
    userAnswers: {},
    time: 30,
  };

  async componentDidMount() {
    const { logout, history } = this.props;
    try {
      const token = localStorage.getItem('token');
      const questions = await fetchQuestions(token);
      this.setState({ questions });
      this.timer();
    } catch (error) {
      logout();
      history.push('/');
    }
  }

  handleAnswerClick = (answerIndex, correctAnswerIndex) => {
    const { userAnswers, questionNumber } = this.state;
    this.setState({
      userAnswers: {
        ...userAnswers,
        [questionNumber]: answerIndex,
      },
    });
    this.handleAnswer(answerIndex === correctAnswerIndex);
  };

  handleAnswer = (isCorrect) => {
    const { answer } = this.props;
    const { difficulty } = this.getCurrentQuestion();
    const { time } = this.state;
    answer({ isCorrect, reamingTime: time, difficulty });
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

  timer() {
    const oneSecond = 1000;
    const interval = setInterval(() => {
      const { time } = this.state;
      if (time === 0) {
        clearInterval(interval);
        this.handleAnswer(false);
        return;
      }
      this.setState((s) => ({ time: s.time - 1 }));
    }, oneSecond);
  }

  renderQuestion = (data, time) => {
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
              disabled={ time === 0 }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { time } = this.state;
    return (
      <>
        <Header />
        <span>
          remaining time:
          {' '}
          { time }
        </span>
        {this.renderQuestion(this.getCurrentQuestion(), time)}
      </>
    );
  }
}

const mapDispatchToProps = {
  logout: actionLogout,
  answer: actionAnswer,
};

export default connect(null, mapDispatchToProps)(Game);

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  logout: PropTypes.func.isRequired,
  answer: PropTypes.func.isRequired,
};
