import React, {Component} from 'react';
import { View, TextInput,  } from 'react-native';
import jss from '../../Styles/app.style';

class Input extends Component {
  state = {
    validStatusStyle:null,
    touched:false,
    valid:true
  };

  componentWillMount() {
    console.log(this.props);
    this.setValidity(this.props.validity);
    this.validator = this.props.validator || (() => {return true});
  }

  componentWillReceiveProps(nextProps) {
    this.setValidity(nextProps.validity);
  }

  setValidity = (status) => {
    let _successStatusStyle = status === null ? {} : styles[(status === true ? 'inputSuccess' : 'inputError')];
    if(status != null){
      if( this.props.validStyle ){
        _successStatusStyle = status ? this.props.validStyle : _successStatusStyle;
      } else if( this.props.invalidStyle ){
        _successStatusStyle = !status ? this.props.invalidStyle : _successStatusStyle;
      }
    }
    this.setState({validStatusStyle:_successStatusStyle});
  }

  onBlur = () => {
    this.setState({touched:true});
    this.setState({
      valid: (
          this.validator(this.props.value) &&
        ( this.props.validateEmail ? this.isValidEmail() : this.validator(this.props.value) )
      )
    });
    // this.setState({valid:false});
    console.log(this.state);
    this.setValidity(this.state.valid);
    if(this.props.onBlur) this.props.onBlur({state: this.state, value: this.props.value});
  }

  onFocus = () => {
    if(!!this.props.onFocus) this.props.onFocus(this.props.value);
  }

  isValidEmail = () => {
    return /^([\w\-]{2,}\.?)+@([\w\-]{2,}\.?)+\.[a-z]{2,}$/.test(this.props.value.trim());
  }

  render() {
    return (
      <View style={[styles.input, this.state.validStatusStyle]}>
        <TextInput
          style={styles.textinput}
          value = {this.props.value}
          onChangeText = {this.props.onChangeText}
          placeholder = {this.props.placeholder || ''}
          keyboardType = {this.props.keyboardType || 'default'}
          secureTextEntry = {this.props.secureTextEntry}
          autoCapitalize = {this.props.autoCapitalize ||'none'}
          onBlur = {this.onBlur}
          onFocus = {this.onFocus}
        />
      </View>
    );
  }

};

const styles = {
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 0,
    backgroundColor: '#fff',
    position: 'relative',
  },
  textinput: {
    height: 36,
    padding: 8,
    flexGrow: 1,
  },
  inputError: {
    backgroundColor: '#fee',
    borderColor: '#faa'
  },
  inputSuccess: {
    backgroundColor: '#efe',
    borderColor: '#afa',
  }
};

export { Input };
