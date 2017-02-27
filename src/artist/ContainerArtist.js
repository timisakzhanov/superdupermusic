import { connect } from 'react-redux'
import ComponentArtist from './ComponentArtist'
import { authPlayer, destroyPlayer } from './ActionsArtist'

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    onArtistScreenCreated: (token) => {
      dispatch(authPlayer(token))
    },

    onDestroyPlayer: () => {
      dispatch(destroyPlayer())
    }
  }
}

const ContainerArtist = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentArtist)

export default ContainerArtist
