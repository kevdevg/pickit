import {isNil} from 'lodash/fp';
import {endpoints, headers} from '../constants';

export const receiveEntries = (entries) => (
  {
    type: 'RECEIVE_ENTRIES',
    entries,
  }
);

export const receiveMyEntries = (entries) => (
  {
    type: 'RECEIVE_MY_ENTRIES',
    entries,
  }
);

export const receiveBothEntries = (entries) => (
  {
    type: 'RECEIVE_BOTH_ENTRIES',
    entries,
  }
);


export const refreshMyEntries = () => (
  {
    type: 'REFRESH_MY_ENTRIES',
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

export const toggleMyEntriesLoading = () => ({
  type: 'TOGGLE_MY_ENTRIES_LOADING',
});

export function fetchEntries(query) {
  return (dispatch) => {
    dispatch(toggleEntriesLoading());
    console.log(localStorage.getItem('token'));
    return isNil(localStorage.getItem('token')) ?
      (
        fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(json => {
            dispatch(receiveEntries(json.collection.items));
            dispatch(toggleEntriesLoading());
          })
      ) :
      (
        Promise.all([fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`, {
          method: 'GET',
        }).then(response => response.json()), fetch(endpoints.entries, {
          method: 'GET',
          headers: headers.headers(),
        }).then(response => response.json())])
          .then(data => {
            dispatch(receiveBothEntries(data));
            dispatch(toggleEntriesLoading());
          })
      )
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
    dispatch(toggleEntriesLoading());
    return fetch(endpoints.entries, {
      method: 'POST',
      headers: headers.headers(),
      body: JSON.stringify(entry),
    })
      .then(response => {
        dispatch(toggleEntriesLoading());
        dispatch(refreshEntries());
      });
  };
}

export function deleteEntry(entry) {
  return (dispatch) => {
    dispatch(toggleMyEntriesLoading());
    dispatch(toggleEntriesLoading());
    return fetch(`${endpoints.entries}${entry.id}/`, {
      method: 'DELETE',
      headers: headers.headers(),
    })
      .then(response => {
        dispatch(toggleMyEntriesLoading());
        dispatch(toggleEntriesLoading());
        dispatch(refreshMyEntries());
        dispatch(refreshEntries());
      });
  };
}
