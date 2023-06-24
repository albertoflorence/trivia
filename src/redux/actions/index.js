import { gravatarImage } from '../../utils';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ANSWER = 'ANSWER';

export const login = ({ name, email }) => ({
  type: 'LOGIN',
  payload: {
    name,
    gravatarEmail: email,
    avatar: gravatarImage(email),
  },
});

export const logout = () => ({
  type: 'LOGIN',
});

export const answer = (payload) => ({
  type: ANSWER,
  payload,
});
