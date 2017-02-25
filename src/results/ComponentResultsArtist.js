import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

export default class ComponentResultsArtist extends Component {

  constructor(props) {
    super(props)
    this.image = props.artist.images[2]
  }

  render() {
    let genresItems = this.props.artist.genres.length >= 2 ? 2 : this.props.artist.genres.length;
    let genres = genresItems > 0 ? this.props.artist.genres.slice(0, genresItems).join() : '';
    return (
      <TouchableHighlight onPress={() => this.props.onRowClicked(this.props.artist)}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={{uri: this.image == null ? null : this.image.url}}
          />
          <View style={styles.info}>
            <Text style={styles.artistName}>{this.props.artist.name}</Text>
            <Text style={styles.genre}>{genres}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomColor: '#5d5c61',
    borderBottomWidth: 1
  },
  logo: {
    width: 90,
    height: 90,
    marginLeft: 16,
    borderRadius: 45,
  },
  info: {
    flexDirection: 'column',
    marginLeft: 28
  },
  artistName: {
    color: '#ffffff',
    fontSize: 18,
  },
  genre: {
    color: '#ea2859',
    fontSize: 14,
    marginTop: 2
  }
});

ComponentResultsArtist.propTypes = {
  artist: PropTypes.object.isRequired,
  onRowClicked: PropTypes.func.isRequired
}
