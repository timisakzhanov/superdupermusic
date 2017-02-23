import { connect } from 'react-redux'
import ComponentResults from './ComponentResults'
import { fetchArtists } from './ActionsResults'
import { selectArtist } from '../artist/ActionsArtist'


const mapStateToProps = (state) => {
  return {
    authToken: state.token,
    query: state.query,
    artists: state.artists.items,
    isFetching: state.artists.isFetching,
    error: state.artists.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSceneCreated: (spotifyApi, query) => {
      dispatch(fetchArtists(spotifyApi, query))
    },

    onArtistSelected: (artist) => {
      dispatch(selectArtist(artist))
    }
  }
}

const ContainerResults = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentResults)

export default ContainerResults
