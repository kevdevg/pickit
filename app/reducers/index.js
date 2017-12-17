import { combineReducers } from 'redux';
import postsData from './postsReducer';
import entriesData from './entriesReducer';

const appReducer = combineReducers({
  postsData, entriesData,
});

export default appReducer;
