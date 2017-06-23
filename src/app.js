import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Header } from './Components/Common/index';
import { HttpService } from './Services/index';
import LoginForm from './Components/LoginForm';

class ghApp extends Component {
  render () {
    return (
      <View>
        <Header headerText="Login" />
        <LoginForm />
      </View>
    )
  }
};

export default ghApp;
