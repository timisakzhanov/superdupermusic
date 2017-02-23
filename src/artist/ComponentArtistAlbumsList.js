import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'
import GridView from 'react-native-grid-view'
import SpotifyApi from '../resources/SpotifyApi'


export default class ComponentArtistAlbumsList extends Component {
  constructor(props) {
    super(props)
    this.spotifyApi = new SpotifyApi(this.props.authToken);
  }

  render() {
    return(
      <View style={ styles.container }>
        { this.displayProgress() }
        { this.displayError() }

        <GridView
          items={this.props.albums}
          itemsPerRow={2}
          renderItem={this.renderAlbumItem}
          style={ styles.gridView }
        />
      </View>
    )
  }

  renderAlbumItem(album) {
    return <Image source={{uri: album.images[1].url}} style={styles.album}>
              <Text style={styles.name}>{album.name}</Text>
           </Image>
  }

  displayProgress() {
    if (this.props.isAlbumsFetching) {
      return <Text>Loading...</Text>
    }
  }

  displayError() {
    if (this.props.albumsFetchingError !== '') {
      return <Text>Error: {this.props.albumsFetchingError}</Text>
    }
  }

  componentDidMount() {
    this.props.onAlbumsLayoutDisplayed(this.spotifyApi, this.props.artistId)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#64B5F6'
  },
  gridView: {
    backgroundColor: '#AB47BC'
  },
  album:  {
    flex: 1,
    height: 150
  },
  name: {
    position: 'absolute',
    bottom: 0,
    marginLeft: 8,
    marginBottom: 8,
    fontSize: 16,
    color: '#ffffff',
    textShadowColor:'#585858',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:5,
  }
})

ComponentArtistAlbumsList.propTypes = {
  authToken: React.PropTypes.string.isRequired,
  artistId: React.PropTypes.string.isRequired,
  isAlbumsFetching: React.PropTypes.bool.isRequired,
  albumsFetchingError: React.PropTypes.string.isRequired,
  albums: React.PropTypes.array.isRequired,
  onAlbumsLayoutDisplayed: React.PropTypes.func.isRequired
}
