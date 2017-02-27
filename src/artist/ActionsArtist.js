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

export const playAlbum = (_albumId) => {
  return { type: 'PLAY_ALBUM', albumId: _albumId}
}

function fetchAlbums(spotifyApi, artistId) {
  return spotifyApi.fetchArtistsAlbums(artistId)
}
