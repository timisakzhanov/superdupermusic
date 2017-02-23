import { connect } from 'react-redux'
import ComponentArtistAlbumsList from './ComponentArtistAlbumsList'
import { fetchArtistAlbums } from './ActionsArtist'

const mapStateToProps = (state) => {
  return {
    authToken: state.token,
    artistId: state.artist.item.id
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    onAlbumsLayoutDisplayed: (spotifyApi, artistId) => {
      dispatch(fetchArtistAlbums(spotifyApi, artistId))
    }
  }
}

const ContainerArtistAlbumsList = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentArtistAlbumsList)

export default ContainerArtistAlbumsList
