/**
 * Import Libraries
 */
import React, { Component, PropTypes } from 'react'
import { AppRegistry, Navigator, BackAndroid, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


/**
 *  Import native modules
 */
import SpotifyAuthModuleAndroid from './nativeModules/SpotifyAuthModuleAndroid'


/**
 *  Import components
 */
import ContainerResults from './results/ContainerResults'
import ComponentSearch from './search/ComponentSearch'
import ComponentArtist from './artist/ComponentArtist'
import buildStyleInterpolator from 'react-native/Libraries/Utilities/buildStyleInterpolator'


/**
 *  Import redusers
 */
import rootReducer from './ReducersApp'


/**
 *  Import actions
 */
import { updateSearchQuery } from './search/ActionsSearch'
import { setToken } from './ActionsApp'


import Routes from './routes'


let store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


export default class SuperDuperMusicApp extends Component {
  constructor(props) {
    super(props)
    this.navigator

    // TODO: remove huck
    let unsubscribe = store.subscribe(() => {
      console.log(store.getState())
    })

    this.getLocalAuthToken()
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <Provider store={store} >
        <Navigator
          initialRoute={{ name: Routes.search }}
          renderScene={ this.renderScene.bind(this) }
          configureScene={(route, routeStack) => TRANSITION_NONE}
        />
      </Provider>
    )
  }

  componentDidMount() {
    this.startAuthProcess()
  }

  renderScene(route, navigator) {
    if (this.navigator == null) {
      this.navigator = navigator
    }
    if (route.name == Routes.search) {
      return <ComponentSearch
                onSearchClick={() => this.navigate(Routes.results)}
                onLogoutClick={() => this.logout()}/>
    }
    if (route.name == Routes.results) {
      return <ContainerResults
                onSetArtistRoute={() => this.navigate(Routes.artist)}/>
    }
    if (route.name == Routes.artist) {
      return <ComponentArtist />
    }
  }

  navigate(route) {
    this.navigator.push({
      name: route,
    })
  }

  logout() {
    SpotifyAuthModuleAndroid.logOut();
  }

  startAuthProcess() {
    SpotifyAuthModuleAndroid.startAuthProcess(
      (msg)=>{console.log("error: " + msg)},
      (token)=>AsyncStorage.setItem('authToken', token)
    )
  }

  getLocalAuthToken() {
    AsyncStorage.getItem('authToken')
      .then((value) => {
        store.dispatch(setToken(value))
      })
  }
}

// Hack to see network requests in chrome browser
const _XHR = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;
XMLHttpRequest = _XHR;

const NoTransition = {
    opacity: {
        value: 1.0,
        type: 'constant',
    }
};

const TRANSITION_NONE = Object.assign({}, Navigator.SceneConfigs.FadeAndroid, {
    gestures: null,
    defaultTransitionVelocity: 1000,
    animationInterpolators: {
        into: buildStyleInterpolator(NoTransition),
        out: buildStyleInterpolator(NoTransition),
    },
});


SuperDuperMusicApp.propTypes = {
  platform: PropTypes.string.isRequired
}
