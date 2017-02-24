import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  AsyncStorage,
  View,
  Text,
} from 'react-native'

import SpotifyAuthModuleAndroid from '../nativeModules/SpotifyAuthModuleAndroid'

export default class ComponentAuthorization extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is login form, welcome!</Text>
        <Text style={styles.button} onPress={()=>this.startAuthProcess()}>Login</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    marginTop: 50
  },
  button: {
    marginTop: 40,
    paddingLeft: 40,
    paddingTop: 10,
    paddingRight: 40,
    paddingBottom: 10,
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: '#00E676'
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
