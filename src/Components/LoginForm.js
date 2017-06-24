import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button, Card, CardSection, Input} from './Common';
import { HttpService } from '../Services/index';
import jss from '../Styles/app.style';

class LoginForm extends Component {
  state = {
    username: 'ciao118@ciao.co',
    password: 'ciaociA0',
    errorLogin: null,
    input: '',
    inputSuccess: null
  };

  componentWillMount() {
    this.http = new HttpService('QA');
  }

  submit = () => {
    this.setState({errorLogin: null, inputSuccess: null});
    console.log('email', this.refs.email.checkValidity(), 'password', this.refs.password.checkValidity(), this.state.username , this.state.password);
    if( this.refs.email.checkValidity() && this.refs.password.checkValidity() ){
      this.http.login(this.refs.email.val(), this.refs.password.val())
      .subscribe(
        (resp) => {
          console.log(resp);
          this.setState({inputSuccess: true});
        },
        (err) => {
          console.log(err);
          if(err.status === 401){
            this.setState({errorLogin: err.message, inputSuccess: false});
          }
        }
      );
    }
  }

  render() {
    return (
        <View style={jss.mainContainer}>
          <Input
              ref='email'
              validity={this.state.inputSuccess}
              validStyle={$jss.validStyle}
              placeholder='uername or email address'
              keyboardType="email-address"
              validateEmail
              onBlur={(val)=>{console.log('VALUE INPUT: ', val);}}
          />
          <Input
              ref='password'
              value={this.state.password}
              validity={this.state.inputSuccess}
              validStyle={$jss.validStyle}
              placeholder='password'
              secureTextEntry={true}
              maxLength={16}
              minLength={8}
              validator={(val) => { return /[A-Z]/.test(val) && /[\d]/.test(val); }}
          />

          <View>
            <Button click={this.submit} textStyle={jss.submitLogin}>Log in</Button>
            <Text style={jss.errorField(this.state.errorLogin)}>{this.state.errorLogin}</Text>
          </View>
        </View>
    );
  }
}

const $jss = {
  validStyle: {
    backgroundColor: '#EFE',
    borderColor: '#6C6',
  }
}

export default LoginForm;
