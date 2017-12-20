import {fromJS, getIn} from 'immutable';

import ACTION_TYPES from '../actions/actionTypes';

export const initialState = fromJS({
  entries: [],
  totalResults: null,
  refresh: false,
  entriesLoading: false,
  myEntries: [],
  totalEntries: null,
  refreshMyEntries: false,
  myEntriesLoading: false,
});

export default function entriesData(state = initialState, action) {
  switch (action.type) {

    case ACTION_TYPES.RECEIVE_ENTRIES: {
      console.log(action);
      const totalResults = action.entries.length;
      const entries = fromJS(action.entries).map(e =>
        fromJS({
          image: e.getIn(['links', 0, 'href']),
          tags: e.getIn(['data', 0, 'keywords']),
          date_created: e.getIn(['data', 0, 'date_created']),
          title: e.getIn(['data', 0, 'title']),
          description: e.getIn(['data', 0, 'description']),
          nasa_id: e.getIn(['data', 0, 'nasa_id']),
          pick: true,
        }),
      );
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

    case ACTION_TYPES.REFRESH_MY_ENTRIES:
      return state.set('refreshMyEntries', true);

    case ACTION_TYPES.TOGGLE_MY_ENTRIES_LOADING:
      return state.set('myEntriesLoading', !state.get('myEntriesLoading'));

    case ACTION_TYPES.RECEIVE_MY_ENTRIES: {
      console.log(action);
      const totalResults = action.entries.length;
      const entries = fromJS(action.entries);
      return state.withMutations(map => {
        map.set('myEntries', entries)
          .set('totalEntries', totalResults)
          .set('refreshMyEntries', false);
      });
    }

    case ACTION_TYPES.RESET_ENTRIES:
      return initialState;
    default:
      return state;
  }
}

