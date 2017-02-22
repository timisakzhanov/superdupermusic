export const setToken = (token) => {
  return { type: 'UPDATE_TOKEN', token }
}

export const setRoute = (route) => {
  return { type: 'UPDATE_ROUTE', route }
}
