import React, {Component} from 'react';
import { View, TextInput,  } from 'react-native';
import jss from '../../Styles/app.style';


/* PROPS */
/*
  validStyle
  invalidStyle
  minLength
*/
class Input extends Component {
  state = {
    touched:false,
    valid:true,
    value:this.props.value,
  };

  /** LIFE CYCLES **/

  componentWillMount() {
    console.log(this.props);
    this.setValidity(this.props.validity);
    //$validator: fn()
    this.$validator = this.props.validator && typeof this.props.validator === 'function'
                      ? this.props.validator
                      : (() => {return true});
  }

  componentWillReceiveProps(nextProps) {
    this.setValidity(nextProps.validity);
    if(!nextProps.validity){ this.setState({touched:true}); }
  }

  /** METHODS **/

  checkValidity = () => {
    //CUSTOM VALIDITY
    let validity = this.$validator(this.state.value);
    //EMAIL VALIDITY
    validity = this.props.validateEmail
               ? validity && this.isValidEmail()
               : validity;
    //MIN-LENGTH VALIDITY
    validity = this.props.minLength
              ? validity && this.state.value.length > 7
              : validity;
    return validity;
  }

  setValidity = (validity) => {
    let _statusStyle = {};
    if(validity != null){
      _statusStyle = styles[(validity === true ? 'defaultStatusStyle' : 'invalidStatusStyle')];
      if( this.props.validStyle && validity){
        _statusStyle = this.props.validStyle;
      } else if( this.props.invalidStyle && !validity){
        _statusStyle = this.props.invalidStyle;
      }
    }
    this.setState({statusStyle: _statusStyle, valid: validity});
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
    this.setValidity(this.checkValidity());
    if(this.props.onBlur) this.props.onBlur({state: this.state, value: this.state.value});
  }

  onFocus = () => {
    if(!!this.props.onFocus) this.props.onFocus(this.props.value);
  }

  isValidEmail = () => {
    return /^([\w\-]{2,}\.?)+@([\w\-]{2,}\.?)+\.[a-z]{2,}$/.test(this.state.value);
  }

  onChange = (value) => {
    this.setState({value}, () => {
      console.log(this.state.touched);
      if(this.state.touched) {
        this.setValidity(this.checkValidity());
      }
    });
  }

  render() {
    return (
      <View style={[styles.inputContainer, this.state.statusStyle]}>
        <TextInput
          style={styles.textinput}
          value = {this.state.value}
          onChangeText={this.onChange}
          placeholder = {this.props.placeholder || ''}
          keyboardType = {this.props.keyboardType || 'default'}
          secureTextEntry = {this.props.secureTextEntry}
          autoCapitalize = {this.props.autoCapitalize ||'none'}
          onBlur = {this.onBlur}
          onFocus = {this.onFocus}
          maxLength = {this.props.maxLength}
        />
      </View>
    );
  }

};

const styles = {
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 0,
    borderRadius: 4,
    marginTop: 15,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  textinput: {
    height: 36,
    padding: 8,
    flexGrow: 1,
  },
  defaultStatusStyle: {
    backgroundColor: '#fff',
  },
  invalidStatusStyle: {
    backgroundColor: '#fee',
    borderColor: '#faa',
    shadowColor: '#faa',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0}
  },
};

export { Input };
