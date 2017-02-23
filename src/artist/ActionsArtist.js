export const selectArtist = (artistObj) => {
  return { type: 'SELECT_ARTIST', artist: artistObj }
}

export const fetchArtistAlbums = (spotifyApi, artistId) => {
  return function(dispatch) {
    dispatch(startFetchAlbums())
    return fetchAlbums(spotifyApi, artistId)
  }
}

export const startFetchAlbums = () =>  {
  return { type: 'FETCH_ALBUMS_START' }
}

export const fetchAlbumsError = (error) => {
  return { type: 'FETCH_ALBUMS_ERROR', error: error }
}

export const fetchAlbumsSuccess = (json) =>  {
  return { type: 'FETCH_ALBUMS_SUCCESS', albums: json }
}

function fetchAlbums(spotifyApi, artistId) {
  spotifyApi.fetchArtistsAlbums(artistId)
}
