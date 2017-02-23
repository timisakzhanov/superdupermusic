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
        <Image source={{uri: this.props.images[0].url }} style={ styles.image } >
          <Text style={ styles.name }>{this.props.name}</Text>
        </Image>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8BBD0',
    flexDirection: 'row',
    height: 200
  },

  image: {
    flex: 1,
  },

  name: {
    position: 'absolute',
    bottom: 0,
    marginLeft: 8,
    marginBottom: 8,

    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor:'#585858',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:5,
  }
});

ComponentArtistInfo.propTypes = {
  images: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired
}
