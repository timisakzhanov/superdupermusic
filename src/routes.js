const ROUTE_SEARCH = 'Search'
const ROUTE_SEARCH_RESULTS = 'Results'
const ROUTE_ARTIST = 'Artist'

export default class Routes {
  static get search() {
    return ROUTE_SEARCH
  }

  static get results() {
    return ROUTE_SEARCH_RESULTS
  }

  static get artist() {
    return ROUTE_ARTIST
  }
}
