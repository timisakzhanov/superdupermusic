import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import SpotifyApi from '../resources/SpotifyApi'


export default class ComponentArtistAlbumsList extends Component {
  constructor(props) {
    super(props)
    this.spotifyApi = new SpotifyApi(this.props.authToken);
  }

  render() {
    return(
      <View>
        { this.displayProgress() }
        { this.displayError() }
        { console.log(this.props.albums)}
      </View>
    )
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

ComponentArtistAlbumsList.propTypes = {
  authToken: React.PropTypes.string.isRequired,
  artistId: React.PropTypes.string.isRequired,
  isAlbumsFetching: React.PropTypes.bool.isRequired,
  albumsFetchingError: React.PropTypes.string.isRequired,
  albums: React.PropTypes.array.isRequired,
  onAlbumsLayoutDisplayed: React.PropTypes.func.isRequired
}
