import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { $jss } from '../../Styles/index';

const Button = (props) => {
  const { button, text } = styles;
  const textStyle = props.textStyle ? props.textStyle : {};
  return (
      <TouchableOpacity
          style={props.style}
          onPress={props.click}
          delayLongPress={800}
          onLongPress={props.longClick}
      >
        <Text style={[styles.text, textStyle]}>{props.children}</Text>
      </TouchableOpacity>
  );
};

const styles = {
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#fff'
  }
};

export { Button };
