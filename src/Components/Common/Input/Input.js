import React from 'react';
import { View, TextInput, Animated, Text } from 'react-native';
import {InputController} from './Input.controller';
import { $jss } from '../../../Styles/index';
import {jss} from './Input.style';

/* PROPS
  validStyle: jss
  flashedValid: time (ms)
  invalidStyle: jss
  minLength: number
  errorMessage: string
*/
class Input extends InputController {
  render() {
    return (
      <View>
        <Animated.View style={[
              jss.defaultStatusStyle,
              this.state.statusStyle,
        ]}>
          <TextInput
            style={jss.textinput}
            value = {this.state.value}
            onChangeText={this.onChange}
            placeholder = {this.props.placeholder || ''}
            keyboardType = {this.props.keyboardType || 'default'}
            secureTextEntry = {!!this.props.secureTextEntry}
            autoCapitalize = {this.props.autoCapitalize ||'none'}
            onBlur = {this.onBlur}
            onFocus = {this.onFocus}
            maxLength = {this.props.maxLength}
            editable = {this.props.editable || true}
            autoCorrect = {!!this.props.autoCorrect}
          />
        </Animated.View>
        <Text style={$jss.errorMessage}>
          {
            !!this.state.errorMessage && !this.state.valid
            ? this.state.errorMessage : ''
          }
        </Text>
      </View>
    );
  }

};

export { Input };
