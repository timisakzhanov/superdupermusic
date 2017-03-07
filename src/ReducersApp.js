import { combineReducers } from 'redux'
import { StackNavigator } from 'react-navigation';


import query from './search/ReducersSearch'
import artists from './results/ReducersResults'
import artist from './artist/ReducersArtist'
import auth from './authorization/ReducersAuthorization'

const platform = ( state = '', action) => {
  switch (action.type) {
    case 'SET_PLATFORM':
      return action.platform
    default:
      return state
  }
}

const AppNavigator = StackNavigator(AppRouteConfigs);

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const rootReducer = combineReducers({
  nav: navReducer,
  platform,
  auth,
  query,
  artists,
  artist
})

export default rootReducer
