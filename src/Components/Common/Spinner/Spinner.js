import React, {Component} from 'react';
import {View, Animated, Text, Easing, TouchableWithoutFeedback} from 'react-native';
import {$colors} from '../../../Styles/index';

class Spinner extends Component {
  state = { showSpinner : true };

  constructor() {
    super();
    this.resizeInterpol = [];
    this.animations = [];
    this.sizeSm = 15;
    this.sizeMd = 28;
    this.sizeLg = 42;
  }

  rotate(){
    let rotationVal = new Animated.Value(0);
    let rorationInterpolation = rotationVal.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    });

    this.setState({rotation: rorationInterpolation});

    return Animated.timing(rotationVal, {
            toValue: 100,
            duration: 1600,
            easing: Easing.linear
          }).start( () => {
            if( this.state.showSpinner ) {
              this.rotate();
            }
          });
  }

  resize(animatedVal, max, index){
    let interpol = animatedVal.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [1, max, 1]
    });
    if( index === undefined){
      this.resizeInterpol.push(interpol);
    } else {
      this.resizeInterpol[index] = interpol;
    }

    this.setState({resize: this.resizeInterpol});

    return Animated.timing(animatedVal, {
            toValue: 100,
            duration: 1600,
            easing: Easing.linear
          }).start( () => {
            if( this.state.showSpinner ) {
              this.resize(new Animated.Value(0), max, index);
            }
          });
  }

  groupAnimation() {
    this.setState({showSpinner: this.props.showSpinner});
    this.animations = [];
    this.animations.push(this.rotate());
    this.animations.push(this.resize(new Animated.Value(0), 0.5, 0));
    this.animations.push(this.resize(new Animated.Value(0), this.sizeSm/this.sizeLg, 1));
    this.animations.push(this.resize(new Animated.Value(0), this.sizeLg/this.sizeSm, 2));
  }

  componentWillMount(){
    this.groupAnimation();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showSpinner:nextProps.showSpinner});
    if( nextProps.showSpinner ){
      this.groupAnimation();
      Animated.parallel(this.animations).start();
    }
  }

  renderSpinner() {
    if(this.state.showSpinner){
      return (
        <TouchableWithoutFeedback onPress={() => this.setState({showSpinner:false}) } >
          <View style={jss.overlay}>
            <Animated.View style={[jss.spinnerContainer, {transform: [{rotate: this.state.rotation}]} ]}>
              <Animated.View style={[jss.circle(28,24,0,2), {transform: [{scale: this.state.resize[0]}]} ]}></Animated.View>
              <Animated.View style={[jss.circle(42), {transform: [{scale: this.state.resize[1]}]}]}></Animated.View>
              <Animated.View style={[jss.circle(15,-6,30), {transform: [{scale: this.state.resize[2]}]}]}></Animated.View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )
    } else {
      return null;
    }
  }

  render() {
    return ( this.renderSpinner() );
  }

}

const jss = {
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    position: 'absolute',
    zIndex: 10,
    left:0,
    right:0,
    top:0,
    bottom:0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerContainer: {
    width: 72,
    height: 61,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'rgba(200,0,0,0.25)'
  },
  circle: (size, top, left, right) => {
    return {
      width: size,
      height: size,
      borderRadius: size,
      marginTop: top || 0,
      marginLeft: left || 0,
      marginRight: left || 0,
      backgroundColor: $colors.gohenryGreen
    }
  }
}

export { Spinner };
