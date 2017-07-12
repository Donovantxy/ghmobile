import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';

import { $colors, $jss } from '../../Styles/index';
import {Button, Spinner} from '../Common/index';
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
              keyboardType='email-address'
              placeholder='uername or email address'
              validateEmail
              validStyle={$jss.inputSuccess}
              flashingValid = {1500}
              validity={this.state.formSuccess}
              value={this.state.username}
              style={{marginTop:0}}
          />
          <Input
              ref='password'
              validity={this.state.formSuccess}
              validStyle={$jss.inputSuccess}
              flashingValid = {1500}
              placeholder='password'
              secureTextEntry
              autoCorrect={false}
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
          <Spinner showSpinner={this.state.showSpinner}/>
        </View>
    );
  }
}
// <Spinner />


export default LoginForm;
