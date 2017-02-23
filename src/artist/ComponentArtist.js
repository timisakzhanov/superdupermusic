import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

export default class ComponentArtist extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={{ fontSize: 20, marginTop: 50 }}>Artists screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dedede',
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8
  }
});


ComponentArtist.propTypes = {
  artist: React.PropTypes.object.isRequired
}
