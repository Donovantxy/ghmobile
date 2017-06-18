import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  const { button, text } = styles;
  return (
      <TouchableOpacity
          style={button}
          onPress={props.click}
          delayLongPress={800}
          onLongPress={props.longClick}
      >
        <Text style={text}>{props.children}</Text>
      </TouchableOpacity>
  );
};

const styles = {
  button: {
    marginTop: 10,
    backgroundColor: 'rgba(230,210,50,0.05)',
    borderWidth: 1,
    borderColor: '#ffdd99',
    borderRadius: 3,
    alignSelf: 'stretch',
    padding: 6
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '600',
    color: '#aa9966'
  }
};

export { Button };
