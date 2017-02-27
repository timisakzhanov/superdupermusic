export const selectArtist = (artistObj) => {
  return { type: 'SELECT_ARTIST', artist: artistObj }
}

export const fetchArtistAlbums = (spotifyApi, artistId) => {
  return function(dispatch) {
    dispatch(startFetchAlbums())
    return fetchAlbums(spotifyApi, artistId)
      .then((response) => response.json())
      .then((json) => dispatch(fetchAlbumsSuccess(json)))
      .catch((error) => dispatch(fetchAlbumsError(error)))
  }
}

export const startFetchAlbums = () =>  {
  return { type: 'FETCH_ALBUMS_START' }
}

export const fetchAlbumsError = (error) => {
  return { type: 'FETCH_ALBUMS_ERROR', error: error }
}

export const fetchAlbumsSuccess = (json) =>  {
  return { type: 'FETCH_ALBUMS_SUCCESS', albums: json.items }
}

export const startAuthPlayer = () => {
  return { type: 'START_AUTH_PLAYER' }
}

export const successAuthPlayer = () => {
  return { type: 'SUCCESS_AUTH_PLAYER' }
}

export const failAuthPlayer = () => {
  return { type: 'FAIL_AUTH_PLAYER' }
}

export const selectAlbum = (_albumId) => {
  return { type: 'SELECT_ALBUM', albumId: _albumId }
}

export const playAlbum = () => {
  return { type: 'PLAY_ALBUM' }
}

export const pauseAlbum = () => {
  return { type: 'PAUSE_ALBUM' }
}

function fetchAlbums(spotifyApi, artistId) {
  return spotifyApi.fetchArtistsAlbums(artistId)
}
