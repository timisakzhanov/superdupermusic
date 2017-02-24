import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  AsyncStorage,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native'

import SpotifyAuthModuleAndroid from '../nativeModules/SpotifyAuthModuleAndroid'

export default class ComponentAuthorization extends Component {
  render() {

    return (
      <View style={styles.container} >
        <Image source={require('../res/img/background.png')} style={styles.background} />

        <View style={styles.login_container}>
          <Text style={styles.text}>
            Get instant access to millions of songs - from old favorites to the latest hits.
          </Text>
          <Text style={styles.button} onPress={()=>this.startAuthProcess()}>Log in</Text>
        </View>
        {this.displayError()}
      </View>
    )
  }

  startAuthProcess() {
    SpotifyAuthModuleAndroid.startAuthProcess(
      (error)=>{
        this.props.onAuthError("Failed to login")
      },
      (token)=>{
        this.props.onTokenReceived(token)
        AsyncStorage.setItem('authToken', token)
          .then(() => this.props.onAuthComplited())
      }
    )
  }

  displayError() {
      if (this.props.error !== '') {
        return <Text style={styles.error}>{this.props.error}</Text>
      }
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

  },
  background: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "stretch"
  },
  login_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 30,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 45
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius:50,
    fontSize: 24,
    color: '#ffffff',
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: '#ff245a',
  },
  error: {
    position: 'absolute',
    bottom: 30,
  }
})

ComponentAuthorization.propTypes = {
  error: React.PropTypes.string.isRequired,
  onTokenReceived: React.PropTypes.func.isRequired,
  onAuthComplited: React.PropTypes.func.isRequired,
  onAuthError: React.PropTypes.func.isRequired
}
