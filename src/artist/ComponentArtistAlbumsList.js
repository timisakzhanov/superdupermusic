import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
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
          renderItem={this.renderAlbumItem.bind(this)}
          style={ styles.gridView }
          enableEmptySections={true}
          keyboardShouldPersistTaps="always"
        />
      </View>
    )
  }

  renderAlbumItem(album) {
    return (
      <View style={styles.album} key={album.id}>
        <TouchableHighlight onPress={()=>{
          SpotifyPlayerModuleAndroid.play(album.uri)
          this.props.onAlbumClicked(album.id)
        }} underlayColor='#f5a2b7'>
          <Image source={{uri: album.images[1].url}} style={styles.cover} >
            {this.displayPlayBtn(album.id)}
          </Image>
        </TouchableHighlight>
        <Text style={styles.name} >
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

  displayPlayBtn(albumId) {
    if (albumId === this.props.activeAlbumId) {
      return <View><Image source={require('../res/img/ic_pause.png')} style={styles.controlls} /></View>
    }
    return <View><Image source={require('../res/img/ic_play.png')} style={styles.controlls} /></View>
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlls: {
    width: 50,
    height: 50,
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
  activeAlbumId: React.PropTypes.string.isRequired,
  onAlbumsLayoutDisplayed: React.PropTypes.func.isRequired,
  onAlbumClicked: React.PropTypes.func.isRequired,
}
