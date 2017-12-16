import { assign } from 'lodash/fp';
import { endpoints } from '../constants';

export const toggleUser = (user) => (
  {
    type: 'TOGGLE_USER',
    user,
  }
);

export const toggleUserLoading = () => ({
  type: 'TOGGLE_USER_LOADING',
});


export function registerUser(user) {
  return (dispatch) => {
    dispatch(toggleUserLoading());
    return fetch(endpoints.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assign({}, user)),
    }).then(() => dispatch(toggleUserLoading()));
  };
}

export function loginUser(user) {
  return (dispatch) => {
    dispatch(toggleUserLoading());
    return fetch(endpoints.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assign({}, user)),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(toggleUserLoading());
        dispatch(toggleUser(json));
      });
  };
}


export function logoutUser() {
  return (dispatch) => {
    dispatch(toggleUser(undefined));
  };
}
