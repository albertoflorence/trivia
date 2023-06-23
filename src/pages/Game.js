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

  renderQuestion = (data) => {
    if (!data) return null;
    const { category, question, answers, correctAnswerIndex } = data;

    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              key={ answer }
              data-testid={
                correctAnswerIndex === index ? 'correct-answer' : `wrong-answer-${index}`
              }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { questions, questionNumber } = this.state;

    return (
      <>
        <Header />
        {this.renderQuestion(questions[questionNumber])}
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
