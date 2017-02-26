import artist from '../src/artist/ReducersArtist'
import {
  selectArtist,
  startFetchAlbums,
  fetchAlbumsError,
  fetchAlbumsSuccess } from '../src/artist/ActionsArtist'

describe('artist reducer', () => {

  it('should return initial state', () => {
    expect(artist(undefined, {})).toEqual(
      {
          item: {},
          isAlbumsFetching: false,
          albumsFetchingError: '',
          albums: []
      }
    )
  })

  it ('should handle SELECT_ARTIST', () => {
    let artistObj = { name: 'validArtist' }
    let selectArtistAction = selectArtist(artistObj)

    expect(artist(undefined, selectArtistAction))
      .toEqual({
        item: artistObj,
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: []
      })
  })

  it ('should handle FETCH_ALBUMS_START', () => {
    let fetchAlbumsStartAction = startFetchAlbums()

    expect(artist(undefined, fetchAlbumsStartAction))
      .toEqual({
        item: {},
        isAlbumsFetching: true,
        albumsFetchingError: '',
        albums: []
      })
  })

  it ('should handle FETCH_ALBUMS_ERROR', () => {
    expect(artist(undefined, fetchAlbumsError("test error")))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: 'test error',
        albums: []
      })
  })

  it ('should handle FETCH_ALBUMS_SUCCESS', () => {
    let albums = {items: [{album: 'successAlbum'}]}
    expect(artist(undefined, fetchAlbumsSuccess(albums)))
      .toEqual({
        item: {},
        isAlbumsFetching: false,
        albumsFetchingError: '',
        albums: [{album: 'successAlbum'}]
      })
  })
})
