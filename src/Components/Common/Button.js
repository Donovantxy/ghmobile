import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  const { button, text } = styles;
  const textStyle = props.textStyle ? props.textStyle : {};
  return (
      <TouchableOpacity
          style={button}
          onPress={props.click}
          delayLongPress={800}
          onLongPress={props.longClick}
      >
        <Text style={[styles.text, textStyle]}>{props.children}</Text>
      </TouchableOpacity>
  );
};

const styles = {
  button: {
    // marginTop: 10,
    // backgroundColor: 'linear-gradient(#25b5b8,#259598)',
    backgroundColor: '#25b5b8',
    borderWidth: 1,
    borderColor: '#259598',
    borderRadius: 3,
    alignSelf: 'stretch',
    padding: 6
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  }
};

export { Button };
