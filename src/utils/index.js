import md5Hash from 'crypto-js/md5';

export const gravatarImage = (email) => {
  const hash = md5Hash(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

export const toCamelCase = (object) => Object
  .entries(object).reduce((newObject, [key, value]) => {
    const camelCaseKey = key.replace(/(_.)/, (match) => match[1].toUpperCase());
    return {
      ...newObject,
      [camelCaseKey]: value,
    };
  }, {});

export const shuffleAnswers = ({ correctAnswer, incorrectAnswers }) => {
  const fiftyPercent = 0.5;
  const shuffledAnswers = [correctAnswer, ...incorrectAnswers].sort(
    () => Math.random() - fiftyPercent,
  );
  return shuffledAnswers;
};
