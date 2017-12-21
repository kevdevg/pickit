import { combineReducers } from 'redux';
import entriesData from './entriesReducer';
import usersData from './usersReducer';

const appReducer = combineReducers({
   entriesData, usersData,
});

export default appReducer;
