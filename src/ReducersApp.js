import { combineReducers } from 'redux'
import query from './search/ReducersSearch'
import artists from './results/ReducersResults'

const token = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return action.token
    default:
      return state
  }
}

const route = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_ROUTE':
      return action.route
    default:
      return state
  }
}

const rootReducer = combineReducers({
  token,
  route,
  query,
  artists
})

export default rootReducer
