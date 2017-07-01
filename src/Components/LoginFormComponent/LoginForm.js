import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';

import { $colors, $jss } from '../../Styles/index';
import {Button, Card, CardSection} from '../Common';
import { InputController, Input } from '../Common/Input/index';

import LoginFormController from './LoginForm.controller';
import jss from './LoginForm.style';
import imgs from '../../Assets/Images/index';

class LoginForm extends LoginFormController {

  render() {
    return (
        <View style={[$jss.mainContainer, $jss.flexContainer()]}>
          <Image
            style={jss.logo}
            source={imgs.logo}
            resizeMode="contain"
          />
          <Input
              ref='email'
              validity={this.state.inputSuccess}
              validStyle={$jss.inputSuccess}
              placeholder='uername or email address'
              keyboardType='email-address'
              validateEmail
              flashingValid = {2000}
              value={this.state.username}
              autoCorrect={true}
              style={{marginTop:0}}
          />
          <Input
              ref='password'
              validity={this.state.inputSuccess}
              validStyle={$jss.inputSuccess}
              flashingValid = {2000}
              placeholder='password'
              secureTextEntry={true}
              maxLength={16}
              minLength={8}
              validator={this.passwordValidator}
              value={this.state.password}
          />
          <View>
            <Button
              click={this.submit}
              style={$jss.button($colors.gohenryGreen, $colors.gohenryGreenDarker)}>
                Log in
            </Button>
            <Text style={$jss.errorField(this.state.errorLogin)}>{this.state.errorLogin}</Text>
          </View>
        </View>
    );
  }
}

export default LoginForm;
