import React, { Component, PropTypes } from 'react'
import {
  NativeAppEventEmitter,
  AsyncStorage,
  View,
  Text,
  Image,
} from 'react-native'


import SpotifyAuthModuleAndroid from '../nativeModules/SpotifyAuthModuleAndroid'
import { NativeModules } from 'react-native';
var SuperAuth = NativeModules.SuperAuth;


import { styles } from './Styles'

var subscription = NativeAppEventEmitter.addListener(
  'EventReminder',
  (reminder) => console.log("token: " + reminder.accessToken)
);

export default class ComponentAuthorization extends Component {
  render() {

    return (
      <View style={styles.container} >
        <Image source={require('../res/img/background.png')} style={styles.background} />

        <ComponentAuthContainer
            startAuthProcess={()=> this.startAuthProcess()}/>
        {this.displayError()}
      </View>
    )
  }

  componentWillUnmount() {
    subscription.remove()
  }

  startAuthProcess() {
    if (this.props.platform === 'ios') {
      SuperAuth.addEvent('test test test!!!!!!')
    }

    if (this.props.platform === 'android') {
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
  }

  displayError() {
      if (this.props.error !== '') {
        return <Text style={styles.error}>{this.props.error}</Text>
      }
  }
}

class ComponentAuthContainer extends Component {
  render() {
    return (
      <View style={styles.login_container}>
        <Text style={styles.text}>
          Get instant access to millions of songs - from old favorites to the latest hits.
        </Text>
        <Text style={styles.button} onPress={()=>this.props.startAuthProcess()}>Log in</Text>
      </View>
    )
  }
}

ComponentAuthorization.propTypes = {
  token: React.PropTypes.string.isRequired,
  error: React.PropTypes.string.isRequired,
  platform: React.PropTypes.string.isRequired,
  onTokenReceived: React.PropTypes.func.isRequired,
  onAuthComplited: React.PropTypes.func.isRequired,
  onAuthError: React.PropTypes.func.isRequired
}
