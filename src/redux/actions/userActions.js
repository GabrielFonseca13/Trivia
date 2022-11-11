export const LOGIN = 'LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const loginUser = (data) => ({
  type: LOGIN,
  payload: data,
});

export const insertScore = (score) => ({
  type: UPDATE_SCORE,
  payload: score,
});
