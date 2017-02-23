const artist = (state = {
  item: {}
}, action) => {
  switch(action.type) {
    case 'SELECT_ARTIST':
      return Object.assign({}, state, { item: action.artist })
    default:
      return state
  }
}

export default artist
