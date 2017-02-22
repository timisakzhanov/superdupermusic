import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

export default class ComponentResultsArtist extends Component {

  constructor(props) {
    super(props)
    this.image = props.artist.images[2]
  }

  render() {
    return (
      <View style={{flexDirection: 'row', height: 72, marginTop: 8, alignItems: 'center'}}>
        <Image
          style={{backgroundColor: '#E0E0E0', width: 72, height: 72, marginLeft: 8}}
          source={{uri: this.image == null ? null : this.image.url}}
        />
        <Text style={styles.artistName}>{this.props.artist.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  artistName: {
    marginLeft: 8,
    fontSize: 16,
  }
});

ComponentResultsArtist.propTypes = {
  artist: PropTypes.object.isRequired
}
