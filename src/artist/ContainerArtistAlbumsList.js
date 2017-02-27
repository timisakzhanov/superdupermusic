import { connect } from 'react-redux'
import ComponentArtistAlbumsList from './ComponentArtistAlbumsList'
import { fetchArtistAlbums, playAlbum } from './ActionsArtist'

const mapStateToProps = (state) => {
  return {
    authToken: state.auth.token,
    artistId: state.artist.item.id,
    isAlbumsFetching: state.artist.isAlbumsFetching,
    albumsFetchingError: state.artist.albumsFetchingError,
    albums: state.artist.albums
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    onAlbumsLayoutDisplayed: (spotifyApi, artistId) => {
      dispatch(fetchArtistAlbums(spotifyApi, artistId))
    },

    onAlbumClicked: (albumId) => {
      dispatch(playAlbum(albumId))
    }
  }
}

const ContainerArtistAlbumsList = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentArtistAlbumsList)

export default ContainerArtistAlbumsList
