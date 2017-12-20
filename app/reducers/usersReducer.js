import {fromJS} from 'immutable';
import ACTION_TYPES from "../actions/actionTypes";

export const initialState = fromJS({
  token: localStorage.getItem('token'),
  refresh: false,
  userLoading: false,
});

export default function usersData(state = initialState, action) {
  switch (action.type) {

    case ACTION_TYPES.TOGGLE_TOKEN: {
      console.log(action);
      const token = action.json.key;
      console.log(token);
      return state.set('token', token);
    }

    case ACTION_TYPES.LOGOUT_USER:
      return state.set('token', undefined);

    case ACTION_TYPES.REFRESH_USER:
      return state.set('refresh', true);

    case ACTION_TYPES.TOGGLE_USER_LOADING:
      return state.set('userLoading', !state.get('userLoading'));

    default:
      return state;
  }
}

