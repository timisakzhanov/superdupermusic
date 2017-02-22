import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import ComponentSearchHeader from './ComponentSearchHeader'
import ContainerSearchQueryInput from './ContainerSearchQueryInput'

import SpotifyAuthModuleAndroid from '../nativeModules/SpotifyAuthModuleAndroid'

export default class ComponentSearch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ComponentSearchHeader text='Look for your favorites artists'/>

        <ContainerSearchQueryInput placeholder='Artist name' onRouteUpdated={()=>this.props.onSearchClick()} />

        <TouchableHighlight onPress={ this.props.onLogoutClick }>
          <Text style={{ fontSize: 20, marginTop: 50 }}>Log out</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

ComponentSearch.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dedede',
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8
  }
});
