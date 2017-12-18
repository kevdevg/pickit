import {assign} from 'lodash/fp';
import {endpoints} from '../constants';

export const toggleToken = (json) => (
  {
    type: 'TOGGLE_TOKEN',
    json,
  }
);

export const toggleUserLoading = () => ({
  type: 'TOGGLE_USER_LOADING',
});

export const refreshUser = () => ({
  type: 'REFRESH_USER',
});


export function registerUser(user) {
  return (dispatch) => {
    dispatch(toggleUserLoading());
    return fetch(endpoints.register, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(assign({}, user)),
    }).then(response => response.json())
      .then(json => {
        dispatch(toggleToken(json));
        dispatch(toggleUserLoading());
        dispatch(refreshUser());
      });
  };
}

export function loginUser(user) {
  return (dispatch) => {
    dispatch(toggleUserLoading());
    return fetch(endpoints.login, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(toggleToken(json));
        dispatch(toggleUserLoading());
        dispatch(refreshUser());
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(toggleUserLoading());
    dispatch(toggleToken({key: undefined}));
    dispatch(toggleUserLoading());
    dispatch(refreshUser());

  };
}
