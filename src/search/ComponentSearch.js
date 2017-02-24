import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

import ComponentSearchHeader from './ComponentSearchHeader'
import ContainerSearchQueryInput from './ContainerSearchQueryInput'

import SpotifyAuthModuleAndroid from '../nativeModules/SpotifyAuthModuleAndroid'


export default class ComponentSearch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bg_container}>
          <Image source={require('../res/img/background_search.png')} style={styles.background} />
        </View>

        <Text onPress={ this.props.onLogoutClick } style={styles.logout}>Log out</Text>

        <View style={{flex: 1, alignItems: 'center'}}>
        <Image source={require('../res/img/logo.png')} style={styles.logo} />
        </View>

        <ContainerSearchQueryInput placeholder='Artist name' onRouteUpdated={()=>this.props.onSearchClick()} />
      </View>
    )
  }
}

ComponentSearch.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "stretch"
  },
  logo: {
    height: 70,
    width: 70,
    marginTop: 30,
    resizeMode: 'center'
  },
  logout: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 12,
    marginRight: 24
  }

});
