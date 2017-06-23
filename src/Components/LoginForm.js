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
    if( this.state.username && this.state.password ){
      this.http.login(this.state.username, this.state.password)
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
        });
    }
  }

  render() {
    return (
        <Card>
          <Input
              ref='email'
              validity={this.state.inputSuccess}
              invalidStyle={jss.inputError}
              placeholder='uername or email address'
              keyboardType="email-address"
              validateEmail
              onChangeText={username => this.setState({username})}
              value={this.state.username}
              onBlur={(val)=>{console.log('VALUE INPUT: ', val);}}
          />
          <Input
              ref='password'
              validStyle={{backgroundColor:'#9e9'}}
              validity={this.state.inputSuccess}
              placeholder='password'
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
              value={this.state.password}
          />

          <CardSection>
            <Button click={this.submit} textStyle={jss.submitLogin}>Log in</Button>
            <Text style={jss.errorField(this.state.errorLogin)}>{this.state.errorLogin}</Text>
          </CardSection>
        </Card>
    );
  }
}


export default LoginForm;
