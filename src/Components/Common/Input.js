import React from 'react';
import { View, TextInput,  } from 'react-native';
import appStyles from '../../Styles/app.styles';

const Input = ({
  value,
  onChangeText,
  placeholder,
  inputSuccess,
  keyboardType,
  secureTextEntry,
  autoCapitalize
}) => {

  let successStatus = inputSuccess === null ? {} : appStyles[(inputSuccess === true ? 'inputSuccess' : 'inputError')];
console.log(successStatus);
  return (

    <View style={[styles.input, successStatus]}>
      <TextInput
        style={appStyles.inputText}
        value = {value}
        onChangeText = {onChangeText}
        placeholder = {placeholder || ''}
        keyboardType = {keyboardType || 'default'}
        secureTextEntry = {secureTextEntry}
        autoCapitalize = {autoCapitalize ||'none'}
      />
    </View>
  );
};

const styles = {
  input: {
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    position: 'relative',
  },
};

export { Input };
