import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native'

export default class ComponentSearchQueryInput extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.search_btn_container}>
        <Text style={styles.message}>Just hit play to stream anything you like.</Text>

        <TextInput style={styles.input}
          placeholder={this.props.placeholder}
          placeholderTextColor='#ea2859'
          underlineColorAndroid='#ea2859'
          onChangeText={(text)=> {
            this.query = text
          }} />

          <Text style={ styles.search_btn } onPress={()=>{this.search()}}>Search</Text>
        </View>
    )
  }

  search() {
    console.log("search")
    if (this.query != null && this.query !== '') {

      this.props.onSearchClick(this.query),
      this.props.onRouteUpdated()
    } else {
      //ask user to fill input
    }
  }
}

const styles = StyleSheet.create({
  search_btn_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  search_btn: {
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
  input: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 100,
    fontSize: 20,
    color: '#ea2859',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  message: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    fontSize: 18,
    color: '#ffffff',
    alignSelf: 'stretch',
    textAlign: 'center',
  }
})

ComponentSearchQueryInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onRouteUpdated: PropTypes.func.isRequired
}
