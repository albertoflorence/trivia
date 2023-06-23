import md5Hash from 'crypto-js/md5';

export const gravatarImage = (email) => {
  const hash = md5Hash(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};
