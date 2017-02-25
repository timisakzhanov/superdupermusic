import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

import ContainerArtistInfo from './ContainerArtistInfo'
import ContainerArtistAlbumsList from './ContainerArtistAlbumsList'

export default class ComponentArtist extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../res/img/background_search.png')} style={styles.background} />

        <View style={styles.navigation_bar}>
          <View style={styles.left_region} >
            <TouchableHighlight onPress={()=>this.props.onBackPress()}>
              <Image source={require('../res/img/arrow_back.png')} style={styles.back_btn} />
            </TouchableHighlight>
          </View>
          <Text style={styles.navigation_title}>Albums</Text>
          <View style={styles.right_region} />
        </View>

        <ContainerArtistInfo />
        
        <ContainerArtistAlbumsList />
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "stretch"
  },
  navigation_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#ea2859'
  },
  back_btn: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  left_region: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right_region: {
    flex: 1
  },
  navigation_title: {
    color: '#ffffff',
    fontSize: 18,
    flex: 3,
    textAlign: 'center',
  },
});

ComponentArtist.propTypes = {
  onBackPress: PropTypes.func.isRequired
}
