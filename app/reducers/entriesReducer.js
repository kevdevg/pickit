import { fromJS, getIn } from 'immutable';

import ACTION_TYPES from '../actions/actionTypes';

export const initialState = fromJS({
  entries: [],
  totalResults: null,
  refresh: false,
  entriesLoading: false,
});

export default function entriesData(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_ENTRIES: {
      console.log(action);
      const totalResults = action.entries.length;
      const entries = fromJS(action.entries).map(e =>{
        console.log(e);
        return fromJS({
            image: e.getIn(['links', 0, 'href']),
            tags: e.getIn(['data', 0, 'keywords']),
            date_created: e.getIn(['data', 0, 'date_created']),
            title: e.getIn(['data', 0, 'title']),
            description: e.getIn(['data', 0, 'description']),
            pick: true,
        });
      });
      return state.withMutations(map => {
        map.set('entries', entries)
          .set('totalResults', totalResults)
          .set('refresh', false);
      });
    }
    case ACTION_TYPES.REFRESH_ENTRIES:
      return state.set('refresh', true);
    case ACTION_TYPES.TOGGLE_ENTRIES_LOADING:
      return state.set('entriesLoading', !state.get('entriesLoading'));
    case ACTION_TYPES.RESET_ENTRIES:
      return initialState;
    default:
      return state;
  }
}

