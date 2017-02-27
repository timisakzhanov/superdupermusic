import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'
import GridView from 'react-native-grid-view'
import SpotifyApi from '../resources/SpotifyApi'

import SpotifyPlayerModuleAndroid from '../nativeModules/SpotifyPlayerModuleAndroid'



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
          enableEmptySections={true}
        />
      </View>
    )
  }

  renderAlbumItem(album) {
    return (
      <View style={styles.album} key={album.id}>
        <Image source={{uri: album.images[1].url}} style={styles.cover} />
        <Text style={styles.name} onPress={()=>{
          SpotifyPlayerModuleAndroid.play(album.uri)
        }}>
          {album.name}
        </Text>
      </View>)
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
    marginTop: 10,
  },
  gridView: {
  },
  album:  {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  cover: {
    width: 120,
    height: 120,
    marginTop: 20
  },
  name: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 10
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
