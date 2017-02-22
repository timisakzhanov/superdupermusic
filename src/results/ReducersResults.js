"use strict"

const artists = (state = {
    isFetching: false,
    error: '',
    items: []
  }, action) => {
  switch (action.type) {
    case 'RESULTS_FETCH_ARTISTS_START':
      return Object.assign({}, state, { isFetching: true, error: '' })
    case 'RESULTS_FETCH_ARTISTS_ERROR':
      return Object.assign({}, state, { isFetching: false, error: action.error })
    case 'RESULTS_FETCH_ARTISTS_SUCCESS':
      return Object.assign({}, state, { isFetching: false, error: '', items: action.artists })
    default:
      return state
  }
}

export default artists
