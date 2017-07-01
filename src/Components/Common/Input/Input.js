import React from 'react';
import { View, TextInput, Animated } from 'react-native';
import {InputController} from './Input.controller';
// import $jss from '../../../Styles/app.style';
import {jss} from './Input.style';

/* PROPS
  validStyle: jss
  flashedValid: time (ms)
  invalidStyle: jss
  minLength: number
*/
class Input extends InputController {
  render() {
    return (
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
          secureTextEntry = {this.props.secureTextEntry}
          autoCapitalize = {this.props.autoCapitalize ||'none'}
          onBlur = {this.onBlur}
          onFocus = {this.onFocus}
          maxLength = {this.props.maxLength}
          editable = {this.props.editable || true}
          autoCorrect = {this.props.autoCorrect || true}
        />
      </Animated.View>
    );
  }

};

export { Input };
