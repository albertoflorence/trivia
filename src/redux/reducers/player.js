import { LOGIN, LOGOUT, ANSWER } from '../actions';

const initialState = {
  name: '',
  gravatarEmail: '',
  avatar: '',
  score: 0,
  assertions: 0,
};

const correctAnswer = (time, difficulty) => {
  const baseScore = 10;
  const difficulties = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  return baseScore + (time * difficulties[difficulty]);
};

const playerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case LOGIN: {
    return {
      ...state,
      ...payload,
    };
  }
  case LOGOUT: {
    return {
      ...initialState,
    };
  }
  case ANSWER: {
    const { score, assertions } = state;
    const { isCorrect, reamingTime, difficulty } = payload;
    return {
      ...state,
      assertions: assertions + 1,
      score: isCorrect ? correctAnswer(reamingTime, difficulty) + score : score,
    };
  }
  default:
    return state;
  }
};

export default playerReducer;
