import {Component} from 'react';
import {AsyncStorage} from 'react-native';
import { HttpService, LoaderService } from '../../Services/';

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
    this.loaderService = new LoaderService();
  };

  doSomething(event) {
    this.http
      .getAuthentication()
      .subscribe((auth) => { console.log(auth); });
    this.loaderService.emitShowLoader(true);
  }

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
      this.loaderService.emitShowLoader(true);
      this.setState({errorLogin: null, formSuccess: null});
      this.http.login(this.refs.email.val(), this.refs.password.val())
      .subscribe(
        (resp) => {
          this.loaderService.emitShowLoader(false);
          this.setState({formSuccess: true});
        },
        (err) => {
          console.log(err);
          if(err.status === 401){
            this.loaderService.emitShowLoader(false);
            this.setState({errorLogin: err.message, formSuccess: err.message});
          } else if( /aborted/i.test(err) ){
            this.setState({errorLogin: 'Connection Aborted'});
            this.loaderService.emitShowLoader(false);
          }

        }
      );
    } //IF
  };

}

export default LoginFormController;
