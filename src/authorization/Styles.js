import { StyleSheet, Dimensions } from 'react-native'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#352144'
  },
  background: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "stretch"
  },
  login_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 30,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 45
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius:50,
    fontSize: 24,
    color: '#ffffff',
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: '#ff245a',
  },
  error: {
    position: 'absolute',
    bottom: 30,
  }
})
