import { fromJS } from 'immutable';

import ACTION_TYPES from '../actions/actionTypes';

export const initialState = fromJS({
  entries: [],
  totalResults: null,
  refresh: false,
  entriesLoading: false,
});

export default function entriesData(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_ENTRANCES: {
      const totalResults = action.entries.length;
      const entries = fromJS(action.entries).map(e => (
        fromJS({
          image: e.links[0].href,
          tags: e.data[0].keywords,
          date_created: e.data[0].date_created,
          title: e.data[0].title,
          description: e.data[0].description,
          pick: true,
        })
      ));
      return state.withMutations(map => {
        map.set('entries', entries)
          .set('totalResults', totalResults)
          .set('refresh', false);
      });
    }
    case ACTION_TYPES.REFRESH_ENTRANCES:
      return state.set('refresh', true);
    case ACTION_TYPES.TOGGLE_ENTRANCES_LOADING:
      return state.set('entriesLoading', !state.get('entriesLoading'));
    case ACTION_TYPES.RESET_ENTRANCES:
      return initialState;
    default:
      return state;
  }
}

