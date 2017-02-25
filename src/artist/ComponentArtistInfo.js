import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

export default class ComponentArtistInfo extends Component {
  render() {
    console.log(this.props.images[0].url)
    return (
      <View style={ styles.container }>
        <Image source={{uri: this.props.images[0].url }} style={ styles.image } />
        <Text style={ styles.name }>{this.props.name}</Text>
        <Text style={ styles.genre}>{this.prepareGenres()}</Text>
      </View>
    )
  }

  prepareGenres() {
    let genresLength = this.props.genres.length;
    if (genresLength == 0) {
      return null
    }
    let genresItems = genresLength > 3 ? 3 : genresLength
    return this.props.genres.slice(0, genresItems).join(', ')
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 40,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
  },

  genre: {
    marginTop: 8,
    color: '#ea2859'
  }
});

ComponentArtistInfo.propTypes = {
  images: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired,
  genres: React.PropTypes.array.isRequired
}
