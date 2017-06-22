import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button, Card, CardSection, Input} from './Common';
import { HttpService } from '../Services/index';
import appStyles from '../Styles/app.styles';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorLogin: null,
    input: '',
    inputSuccess: null
  };

  componentWillMount() {
    this.http = new HttpService();
    this.errorMessage = '';
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
              inputSuccess={this.state.inputSuccess}
              placeholder='uername or email address'
              keyboardType="email-address"
              onChangeText={username => this.setState({username})}
              value={this.state.username}
          />
          <Input
              inputSuccess={this.state.inputSuccess}
              placeholder='password'
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
              value={this.state.password}
          />

          <CardSection>
            <Button click={this.submit} textStyle={appStyles.submitLogin}>Log in</Button>
            <Text style={appStyles.errorField(this.state.errorLogin)}>{this.state.errorLogin}</Text>
          </CardSection>
        </Card>
    );
  }
}


export default LoginForm;
