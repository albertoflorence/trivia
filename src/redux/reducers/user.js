import { LOGIN, LOGOUT } from '../actions';

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
  case LOGOUT: {
    return {
      ...initialState,
    };
  }
  default:
    return state;
  }
};

export default userReducer;
