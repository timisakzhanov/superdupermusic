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
        <Text>Albums list</Text>
      </View>
    )
  }

  componentDidMount() {
    this.props.onAlbumsLayoutDisplayed(this.spotifyApi, this.props.artistId)
  }
}

ComponentArtistAlbumsList.propTypes = {
  authToken: React.PropTypes.string.isRequired,
  artistId: React.PropTypes.string.isRequired,
  onAlbumsLayoutDisplayed: React.PropTypes.func.isRequired
}
