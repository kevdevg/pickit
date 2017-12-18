import { combineReducers } from 'redux';
import postsData from './postsReducer';
import entriesData from './entriesReducer';
import usersData from './usersReducer';

const appReducer = combineReducers({
  postsData, entriesData, usersData,
});

export default appReducer;
