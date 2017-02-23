import { connect } from 'react-redux'
import { updateSearchQuery } from './ActionsSearch'
import ComponentSearchQueryInput from './ComponentSearchQueryInput'


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchClick: (query = '') => {
      dispatch(updateSearchQuery(query))
    }
  }
}

const ContainerSearchQueryInput = connect(
  mapStateToProps,
  mapDispatchToProps
) (ComponentSearchQueryInput)

export default ContainerSearchQueryInput
