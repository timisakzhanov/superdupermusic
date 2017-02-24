import { combineReducers } from 'redux'
import query from './search/ReducersSearch'
import artists from './results/ReducersResults'
import artist from './artist/ReducersArtist'
import auth from './authorization/ReducersAuthorization'

const route = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_ROUTE':
      return action.route
    default:
      return state
  }
}

const rootReducer = combineReducers({
  auth,
  route,
  query,
  artists,
  artist
})

export default rootReducer
