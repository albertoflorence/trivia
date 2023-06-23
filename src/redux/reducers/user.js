import { LOGIN } from '../actions';

const initialState = {
  name: '',
  email: '',
  avatar: '',
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case LOGIN: {
    return {
      ...state,
      ...payload,
    };
  }
  default:
    return state;
  }
};

export default userReducer;
