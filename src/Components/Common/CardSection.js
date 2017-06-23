import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerSection, props.style, props.isHidden]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerSection: {
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    position: 'relative'
  },
};

export { CardSection };
