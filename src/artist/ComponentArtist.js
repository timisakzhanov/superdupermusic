import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import ContainerArtistInfo from './ContainerArtistInfo'
import ContainerArtistAlbumsList from './ContainerArtistAlbumsList'

export default class ComponentArtist extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ContainerArtistInfo />
        <ContainerArtistAlbumsList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dedede',
    flex: 1
  }
});
