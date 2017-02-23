const artist = (state = {
  item: {},
  isAlbumsFetching: false,
  albumsFetchingError: '',
  albums: []
}, action) => {
  switch(action.type) {
    case 'SELECT_ARTIST':
      return Object.assign({}, state, { item: action.artist })
    case 'FETCH_ALBUMS_START':
      return Object.assign({}, state, { isAlbumsFetching: true, albumsFetchingError: ''})
    case 'FETCH_ALBUMS_ERROR':
      return Object.assign({}, state, { isAlbumsFetching: false, albumsFetchingError: action.error })
    case 'FETCH_ALBUMS_SUCCESS':
      return Object.assign({}, state, { isAlbumsFetching: false, albumsFetchingError: '', albums: action.albums})
    default:
      return state
  }
}

export default artist
