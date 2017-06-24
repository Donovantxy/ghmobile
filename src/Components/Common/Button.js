import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import jss from '../../Styles/app.style';

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
    backgroundColor: '#25b5b8',
    borderColor: '#259598',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
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
