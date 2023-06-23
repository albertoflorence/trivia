import { shuffleAnswers, toCamelCase } from '../utils';

export const apiToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
};

export const fetchQuestions = async (token) => {
  const INVALID_TOKEN = 3;
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url).then((r) => r.json());
  if (response.response_code === INVALID_TOKEN) {
    throw new Error('Token inválido');
  }
  const { results } = response;
  return results.map((result) => {
    const { question, correctAnswer, incorrectAnswers, category } = toCamelCase(result);
    const answers = shuffleAnswers({ correctAnswer, incorrectAnswers });
    const correctAnswerIndex = answers.indexOf(correctAnswer);
    return {
      question,
      answers,
      category,
      correctAnswerIndex,
    };
  });
};
