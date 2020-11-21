import React, { Component} from "react";
import { View, Text, Button} from 'react-native';

export default class Admin extends Component{

  logCall = () => {
    this.props.navigation.navigate('Login');
    }

    signCall = () => {
    this.props.navigation.navigate('Signup');
    }

  render(){
  return (
    <View>
      <Text></Text>
      <Button title="login" onPress={this.logCall}></Button>
      <Text></Text>
      <Button title="sign up" onPress={this.signCall}></Button>
    </View>
  );
  }
}
