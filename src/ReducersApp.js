import { combineReducers } from 'redux'
import query from './search/ReducersSearch'
import artists from './results/ReducersResults'
import artist from './artist/ReducersArtist'
import auth from './authorization/ReducersAuthorization'

const rootReducer = combineReducers({
  auth,
  query,
  artists,
  artist
})

export default rootReducer
