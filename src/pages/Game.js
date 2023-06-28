import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { fetchQuestions } from '../services';
import { logout as actionLogout, answer as actionAnswer } from '../redux/actions';
import Logo from '../components/Logo';
import Timer from '../components/icons/Timer';

const colors = ['yellow', 'blue', 'red', 'green', 'purple'];

class Game extends Component {
  state = {
    questions: [],
    questionNumber: 0,
    userAnswers: {},
    time: 30,
    intervalID: 0,
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

  componentWillUnmount() {
    const { intervalID } = this.state;
    clearInterval(intervalID);
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

  handleNextQuestion = () => {
    const { questionNumber, questions } = this.state;
    if (questionNumber === questions.length - 1) {
      const { history } = this.props;
      history.push('/feedback');
      return;
    }
    this.setState({ questionNumber: questionNumber + 1 });
    this.timer();
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
    this.setState({ time: 30 });
    const { intervalID } = this.state;
    clearInterval(intervalID);
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
    this.setState({ intervalID: interval });
  }

  alternative(index, correctAnswer, isAnswered, questionsQuantity) {
    const alternatives = ['A', 'B', 'C', 'D'];
    if (isAnswered) return index === correctAnswer ? '✔' : '✖';
    if (questionsQuantity === 2) return '';
    return alternatives[index];
  }

  renderTimer(time) {
    return (
      <p className="question-time">
        <Timer />
        Tempo:
        {' '}
        {time}
        s
      </p>
    );
  }

  render() {
    const { time, userAnswers, questionNumber } = this.state;
    const isAnswered = userAnswers[questionNumber] !== undefined;
    const question = this.getCurrentQuestion();
    const {
      category = '',
      question: title = '',
      answers = [],
      correctAnswerIndex,
    } = question || {};

    return (
      <div className="container">
        <Header />
        <div className="game">
          <div>
            <div className="game-logo">
              <Logo />
            </div>
            <div className="game-question">
              <p
                className={ `question-category ${colors[questionNumber]}` }
                data-testid="question-category"
              >
                {category}
              </p>
              <p data-testid="question-text" className="question-text">
                {title}
              </p>
              {this.renderTimer(time)}
            </div>
          </div>
          <div className="game-answers">
            <div data-testid="answer-options">
              {answers.map((answer, index) => (
                <button
                  key={ answer }
                  data-testid={
                    correctAnswerIndex === index
                      ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                  onClick={ () => this.handleAnswerClick(index, correctAnswerIndex) }
                  className={ `answer-content ${this.answerClassName(
                    index,
                    correctAnswerIndex,
                  )} ${isAnswered && (correctAnswerIndex === index ? 'green' : 'red')}
                  ` }
                  disabled={ time === 0 }
                >
                  <span className="answer-alternative">
                    {this.alternative(
                      index,
                      correctAnswerIndex,
                      isAnswered,
                      answers.length,
                    )}
                  </span>
                  {answer}
                </button>
              ))}
            </div>
            <button
              data-testid={ isAnswered && 'btn-next' }
              onClick={ this.handleNextQuestion }
              className={ `next-btn ${isAnswered || 'invisible'}` }
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
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
