"use strict"
export default class SpotifyApi {

  constructor(authToken) {
    this.url = 'https://api.spotify.com/v1/'
    this.authToken = 'Bearer ' + authToken
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    }
  }

  searchArtists(query) {
    let requestUrl = this.url + 'search?q=' + query + '&type=artist'
    return fetch(requestUrl, {
      method: 'GET',
      headers: this.headers
    })
    .then((response) => this.processResponse(response))
  }

  fetchArtistsAlbums(artistId) {
    let requestUrl = this.url + 'artists/' + artistId + '/albums?album_type=single,album'
    return fetch(requestUrl, {
      method: 'GET',
      headers: this.headers
    })
    .then((response) => this.processResponse(response))
  }

  processResponse(response) {
    if (response.status !== 200) {
      throw response.statusText
    }
    return response
  }
}
