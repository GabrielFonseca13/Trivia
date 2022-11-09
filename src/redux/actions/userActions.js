export const LOGIN = 'LOGIN';

export const loginUser = (data) => ({
  type: LOGIN,
  payload: data,
});
