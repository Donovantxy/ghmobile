import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {$colors} from '../../../Styles/index';

const Spinner = ({size, showSpinner}) => {
  console.log(showSpinner);
  if(showSpinner){
    return (
        <View style={overlay}>
          <ActivityIndicator style={spinner} size={size || 'large'} color={$colors.gohenryGreen} />
        </View>
    );
  } else { return (<View />); }
}

const overlay = {
  position:'absolute',
  zIndex: 1000,
  backgroundColor: 'rgba(255,255,255,0.85)',
  top:0,
  left:0,
  right:0,
  bottom:0,
  justifyContent: 'center',
}

const spinner = {
  marginTop: -30
}

export { Spinner };
