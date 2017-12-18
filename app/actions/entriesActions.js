import assign from 'lodash/fp/assign';
import { endpoints, headers } from '../constants';

export const receiveEntries = (entries) => (
  {
    type: 'RECEIVE_ENTRIES',
    entries,
  }
);

export const receiveMyEntries = (entries) => (
  {
    type: 'RECEIVE_ENTRIES',
    entries,
  }
);


export const refreshMyEntries = () => (
  {
    type: 'REFRESH_ENTRIES',
  }
);

export const toggleEntriesLoading = () => ({
  type: 'TOGGLE_ENTRIES_LOADING',
});

export const toggleMyEntriesLoading = () => ({
  type: 'TOGGLE_ENTRIES_LOADING',
});

export function fetchEntries(query) {
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

export function fetchMyEntries() {
  return (dispatch) => {
    dispatch(toggleMyEntriesLoading());
    return fetch(endpoints.entries, {
      method: 'GET',
      headers: headers.headers(),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveMyEntries(json));
        dispatch(toggleMyEntriesLoading());
      });
  };
}

export function saveEntry(entry) {
  return (dispatch) => {
    dispatch(toggleMyEntriesLoading());

    console.log(entry);
    console.log(headers.headers());
    console.log(JSON.stringify(entry));
    return fetch(endpoints.entries, {
      method: 'POST',
      headers: headers.headers(),
      body: JSON.stringify(entry),
    })
      .then(response => {
        dispatch(toggleMyEntriesLoading());
        dispatch(refreshMyEntries());
      });
  };
}
