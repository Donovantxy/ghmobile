import {Component} from 'react';
import { HttpService } from '../../Services/index';
import ServiceTest from '../../Services/ServiceTest';


class LoginFormController extends Component{
  state = {
    username: 'ciao21@ciao.com',
    password: 'ciaociA0',
    errorLogin: null,
    input: '',
    inputSuccess: null
  };

  componentWillMount = () => {
    this.http2 = new HttpService('TEST');
    this.st = new ServiceTest();
    this.http = new HttpService('TEST');
  };

  getFormValidity =  () => {
    let isValid = true;
    for(let ii in this.refs){
      if(this.refs[ii].checkValidity(true) !== null){
        isValid = false;
      }
    }
    return isValid;
  };

  passwordValidator = (val) => {
    return (/[A-Z]/.test(val) && /[\d]/.test(val)) || 'Invalid password format';
  }

  submit = () => {
    this.getFormValidity();
    return;
    if( this.getFormValidity() ){
      this.setState({errorLogin: null, inputSuccess: null});
      this.http.login(this.refs.email.val(), this.refs.password.val())
      .subscribe(
        (resp) => {
          console.log(resp);
          this.setState({inputSuccess: true});
        },
        (err) => {
          if(err.status === 401){
            this.setState({errorLogin: err.message, inputSuccess: false});
          }
        }
      );
    } //IF
  };

}

export default LoginFormController;
