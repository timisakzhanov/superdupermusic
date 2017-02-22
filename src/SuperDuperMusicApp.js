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
 *  Import presentational components
 */
import ContainerResults from './results/ContainerResults'
import ComponentSearch from './search/ComponentSearch'
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
          initialRoute={{ name: 'Search' }}
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
    this.navigator = navigator;
    if (route.name == 'Search') {
      return <ComponentSearch
                onSearchClick={()=>this._navigate()}
                onLogoutClick={()=>this._logout()}/>
    }
    if (route.name == 'Results') {
      return <ContainerResults />
    }
  }

  _navigate() {
    this.navigator.push({
      name: 'Results',
    })
  }

  _logout() {
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
