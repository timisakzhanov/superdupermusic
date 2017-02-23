"use strict"

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image,
  AsyncStorage
} from 'react-native'

import ComponentResultsArtist from './ComponentResultsArtist'
import SpotifyApi from '../resources/SpotifyApi'

export default class ComponentResults extends Component {
  constructor(props) {
    super(props);
    this.spotifyApi = new SpotifyApi(this.props.authToken);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  render() {
    const dataSource = this.ds.cloneWithRows(this.props.artists)

    return (
      <View style={{flex: 1, backgroundColor: '#dedede' }}>
        <Text style={{ fontSize: 20, marginLeft: 8, marginTop: 16, marginBottom: 16 }}>Artists list:</Text>
        { this.drawProgress() }
        { this.drawError() }
        <ListView
          dataSource={dataSource}
          renderRow={
            (rowData) =>
              <ComponentResultsArtist artist={rowData} onRowClicked={(artist) => this.processOnRowClicked(artist)}/>
          }
        />
      </View>
    );
  }

  processOnRowClicked(artist) {
    this.props.onArtistSelected(artist)
    this.props.onSetArtistRoute()    
  }

  componentDidMount() {
    this.props.onSceneCreated(this.spotifyApi, this.props.query)
  }

  drawProgress() {
    if (this.props.isFetching) {
      return <Text>Loading...</Text>
    }
  }

  drawError() {
    if (this.props.error != '') {
      return <Text>Error: {this.props.error}</Text>
    }
  }
}

ComponentResults.propTypes = {
  authToken: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  artists: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onSceneCreated: PropTypes.func.isRequired,
  onSetArtistRoute: PropTypes.func.isRequired,
  onArtistSelected: PropTypes.func.isRequired
}
