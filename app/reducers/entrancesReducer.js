import { fromJS } from 'immutable';

import ACTION_TYPES from '../actions/actionTypes';

export const initialState = fromJS({
  entrances: [],
  totalResults: null,
  refresh: false,
  entrancesLoading: false,
});

export default function postsData(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_ENTRANCES: {
      const totalResults = action.entrances.length;
      const entrances = fromJS(action.entraces).map(e => (
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
        map.set('entrances', entrances)
          .set('totalResults', totalResults)
          .set('refresh', false);
      });
    }
    case ACTION_TYPES.REFRESH_ENTRANCES:
      return state.set('refresh', true);
    case ACTION_TYPES.TOGGLE_ENTRANCES_LOADING:
      return state.set('entrancesLoading', !state.get('entrancesLoading'));
    case ACTION_TYPES.RESET_ENTRANCES:
      return initialState;
    default:
      return state;
  }
}
