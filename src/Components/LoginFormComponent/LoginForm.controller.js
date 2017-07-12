import {Component} from 'react';
import { HttpService } from '../../Services/index';

class LoginFormController extends Component{
  state = {
    username: 'ciao21@ciao.com',
    password: 'ciaociA0',
    errorLogin: null,
    formSuccess: null,
    showSpinner: false,
    errorMessageEmail: 'Email format is not right'
  };

  componentWillMount = () => {
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
    if( this.getFormValidity() ){
      this.setState({showSpinner: true});
      this.setState({errorLogin: null, formSuccess: null});
      this.http.login(this.refs.email.val(), this.refs.password.val())
      .subscribe(
        (resp) => {
          this.setState({showSpinner: false});
          this.setState({formSuccess: true});
        },
        (err) => {
          if(err.status === 401){
            this.setState({showSpinner: false});
            this.setState({errorLogin: err.message, formSuccess: err.message});
          }
        }
      );
    } //IF
  };

}

export default LoginFormController;
