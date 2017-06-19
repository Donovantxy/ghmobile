import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
      backgroundColor: '#f8f8f8',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      paddingTop: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.35,
      elevation: 2,
      position: 'relative',
      zIndex: 10
    },
    textStyle: {
        fontSize: 20,
    }
};

export { Header };
