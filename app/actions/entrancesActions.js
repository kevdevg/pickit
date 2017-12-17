import assign from 'lodash/fp/assign';

export const receiveEntries = (entries) => (
  {
    type: 'RECEIVE_ENTRIES',
    entries,
  }
);

export const refreshEntries = () => (
  {
    type: 'REFRESH_ENTRIES',
  }
);

export const toggleEntriesLoading = () => ({
  type: 'TOGGLE_ENTRIES_LOADING',
});

export function fetchEntrances(query) {
  return (dispatch) => {
    dispatch(toggleEntriesLoading());
    return fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveEntries(json.collection.items));
        dispatch(toggleEntriesLoading());
      });
  };
}
