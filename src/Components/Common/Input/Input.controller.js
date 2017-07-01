import {Component} from 'react';
import { Animated } from 'react-native';
import {jss} from './Input.style';

/* PROPS
  validStyle: jss
  flashingValid: time (ms)
  invalidStyle: jss
  minLength: number
*/
class InputController extends Component{
  state = {
    touched:false,
    valid:true,
    value:this.props.value,
    statusStyle: jss.defaultStatusStyle
  };

  /** LIFE CYCLES **/
  componentWillMount() {
    this.$validator = this.props.validator && typeof this.props.validator === 'function'
                      ? this.props.validator
                      : (() => {return null});
  }

  componentWillReceiveProps(nextProps) {
    this.setValidityStyle(nextProps.validity);
    if(!nextProps.validity){ $.setState({touched:true}); }
  }

  /** METHODS **/
  checkValidity = (applySetValidity) => {
    let validity = null;
    var validators = {
      custom    : this.$validator(this.state.value),
      email     : this.props.validateEmail ? this.isValidEmail() : null,
      minLength : this.props.minLength
                  ? ( this.state.value.length >= this.props.minLength
                      ? null
                      : { error: `You have to digit a minimun of ${this.props.minLength} characters` }
                    )
                  : null,
    }
    for(let iv in validators){
      if(validators[iv]){
        validity = validators[iv];
        this.setValidity(validity === null);
        break;
      }
    }

    if(applySetValidity){
      this.setValidityStyle(validity);
    }
    return validity;
  }

  setValidity(validity){
    this.setState({valid: validity, touched: true});
  }

  setValidityStyle = (validityResult) => {
    let _statusStyle = {};
    let _validity = validityResult === null;
    _statusStyle = jss[(_validity ? 'defaultStatusStyle' : 'invalidStatusStyle')];
    if( this.props.validStyle && _validity){
      _statusStyle = this.props.validStyle;
    } else if( this.props.invalidStyle && !_validity){
      _statusStyle = this.props.invalidStyle;
    }
    this.setState({statusStyle: _statusStyle});
    this.setValidity(validityResult);

    if( this.props.flashingValid && !validityResult){
      this.runFlashValidation(_statusStyle);
    }
  }

  runFlashValidation(statusStyle){
    let animations = [];
    let newInterpolationStatusStyle = {};

    for(let ii in statusStyle){
      if( typeof jss.defaultStatusStyle[ii] === 'object' ) {
        continue;
      }
      let animValue = new Animated.Value(0);
      let interpolation = animValue.interpolate({
        inputRange: [0, 70, 100],
        outputRange: [
          statusStyle[ii],
          statusStyle[ii],
          jss.defaultStatusStyle[ii]
        ]
      });
      newInterpolationStatusStyle[ii] = interpolation;

      let animation = Animated.timing(animValue, {
        toValue: 100,
        duration: this.props.flashingValid,
      });
      animations.push(animation);
    }
    this.setState({statusStyle: newInterpolationStatusStyle});
    Animated.parallel(animations).start();
  }

  val = (value) => {
    if(value !== undefined){
      this.setState({value});
      return value.trim();
    }
    return this.state.value;
  }

  onBlur = () => {
    this.setState({touched:true});
    this.setValidityStyle(this.checkValidity());
    if(this.props.onBlur) this.props.onBlur({state: this.state, value: this.state.value});
  }

  onFocus = () => {
    if(!!this.props.onFocus) this.props.onFocus(this.props.value);
  }

  isValidEmail = () => {
    return /^([\w\-]{2,}\.?)+@([\w\-]{2,}\.?)+\.[a-z]{2,}$/.test(this.state.value)
           ? null : { error: 'Wrong email format' };
  }

  onChange = (value) => {
    this.setState({value}, () => {
      if(this.state.touched) {
        this.setValidityStyle(this.checkValidity());
      }
    });
  }
}

export {InputController};
