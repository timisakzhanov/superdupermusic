import React, { Component, PropTypes } from 'react'
import {
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
      <View>
        <TextInput style={{marginTop: 20 }}
          placeholder={this.props.placeholder}
          onChangeText={(text)=> {
            this.query = text
          }} />

          <TouchableHighlight onPress={()=>{
            if (this.query != null && this.query !== '') {
              this.props.onSearchClick(this.query),
              this.props.onRouteUpdated()
            } else {
              //ask user to fill input
            }
          }}>
            <Text style={{ fontSize: 20 }}>Search</Text>
          </TouchableHighlight>
        </View>
    )
  }
}

ComponentSearchQueryInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onRouteUpdated: PropTypes.func.isRequired
}
