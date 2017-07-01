import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Header } from './Components/Common/index';
import { HttpService } from './Services/index';
import LoginForm from './Components/LoginFormComponent/LoginForm';
import $jss from './Styles/app.style';

class ghApp extends Component {
  render () {
    return (
      <View style={{flex:1}}>
        <Header headerText="Login" />
        <LoginForm />
      </View>
    )
  }
};

export default ghApp;
