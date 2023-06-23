import { gravatarImage } from '../../utils/gravatarImage';

export const LOGIN = 'LOGIN';

export const login = (data) => ({
  type: 'LOGIN',
  payload: {
    ...data,
    avatar: gravatarImage(data.email),
  },
});
