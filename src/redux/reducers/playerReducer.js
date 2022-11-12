import { LOGIN, UPDATE_SCORE } from '../actions/userActions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN: {
    return ({
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    });
  }
  case UPDATE_SCORE: {
    return ({
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    });
  }
  default:
    return state;
  }
};

export default player;
