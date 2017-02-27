import { connect } from 'react-redux'
import ComponentArtist from './ComponentArtist'

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {}
}

const ContainerArtist = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentArtist)

export default ContainerArtist
