import {Component} from 'react';
import { Animated } from 'react-native';
import {jss} from './Input.style';
import Validator from './Validator';

/* PROPS
  validStyle: jss
  flashingValid: time (ms)
  invalidStyle: jss
  minLength: number
  errorMessage: string
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
    this.validator = new Validator(this);
    this.$validator = this.props.validator && typeof this.props.validator === 'function'
                      ? this.props.validator
                      : (() => {return null});
  }

  componentWillReceiveProps(nextProps) {
    this.setValidityStyle(nextProps.validity === true ? null : nextProps.validity);
    if(!nextProps.validity){ this.setState({touched:true}); }
  }

  /** METHODS **/
  checkValidity = (applySetValidity) => {
    let validity = null;
    this.setState({
      touched: true,
      valid: false,
      errorMessage: ''
    });
    var validators = {
      custom    : this.props.validator && typeof this.props.validator === 'function'
                  ? Validator.custom(this.props.validator, this.state.value) : null,
      email     : this.props.validateEmail ? Validator.email(this.state.value) : null,
      minLength : this.props.minLength ? Validator.minLength(this.state.value, 8) : null,
      required  : this.props.required
                  ? (!!this.state.value ? null : { error : this.props.required || 'This field is required' })
                  : null
    }
    for(let iv in validators){
      validity = validators[iv];
      if(validity){
        this.setState({
          valid: false,
          errorMessage: this.props.errorMessage || validity.error,
        });
        break;
      }
    }

    if(applySetValidity){
      this.setValidityStyle(validity);
    }
    return validity;
  }

  setValidityStyle = (validityResult) => {
    let _statusStyle = {};
    _statusStyle = jss[(validityResult === null ? 'defaultStatusStyle' : 'invalidStatusStyle')];
    if( this.props.validStyle && validityResult === null){
      _statusStyle = this.props.validStyle;
    } else if( this.props.invalidStyle && validityResult !== null){
      _statusStyle = this.props.invalidStyle;
    }
    this.setState({statusStyle: _statusStyle});
    if( this.props.validStyle && this.props.flashingValid && validityResult === null){
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
        inputRange: [0, 80, 100],
        outputRange: [
          statusStyle[ii],
          statusStyle[ii],
          jss.defaultStatusStyle[ii]
        ]
      });
      newInterpolationStatusStyle[ii] = interpolation;
      let animation = Animated.timing(animValue, {
        toValue: 100,
        duration: this.props.flashingValid && this.props.flashingValid > 1
                  ? this.props.flashingValid
                  : 500,
      });
      animations.push(animation);
    }
    this.setState({statusStyle: newInterpolationStatusStyle});
    Animated.parallel(animations).start();
  }

  val = (value) => {
    if(value !== undefined){
      this.setState({value});
      return value;
    }
    return this.state.value;
  }

  onBlur = () => {
    this.setState({touched:true});
    this.setValidityStyle(this.checkValidity());
    if(this.props.onBlur) this.props.onBlur(this.state.value, this);
  }

  onFocus = () => {
    if(this.props.onFocus) this.props.onFocus(this.props.value, this);
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
