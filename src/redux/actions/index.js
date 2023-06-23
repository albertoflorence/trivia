import { gravatarImage } from '../../utils';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (data) => ({
  type: 'LOGIN',
  payload: {
    ...data,
    avatar: gravatarImage(data.email),
  },
});

export const logout = () => ({
  type: 'LOGIN',
});
