import Singleton from './Singleton';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Rx from 'rxjs/Rx';

class HttpService extends Singleton{

  constructor(envStr) {
    super();
    axios.defaults.baseURL = this.getBaseUrlApi(envStr);
    axios.defaults.timeout = 15000;
    axios.interceptors.response.use(
      (resp) => {
        let ghresp = resp.data || resp;
        ghresp.status = resp.data ? resp.data.status : resp.status;
        return ghresp;
      },
      (err) => {
        if( err.status === 401 ){
            this.removeToken();
            // go to login
        }
        return Promise.reject(err);
      }
    )
  }

  getBaseUrlApi = (env) => {
    let envObj = {
      DEV : 'https://dev-api.gohenry.co.uk/',
      TEST: 'https://test-api.gohenry.co.uk/',
      QA  : 'https://qa-api.gohenry.co.uk/',
      LIVE: 'https://api.gohenry.co.uk/',
    };
    return envObj[env] || envObj['DEV'];
  }

  switchBaseUrlApi(envStr) {
    axios.defaults.baseURL = this.getBaseUrlApi()[envStr];
  }

  getAuthentication() {
    return Rx.Observable
      .fromPromise(AsyncStorage.getItem('authentication'))
      .map(authStr => JSON.parse(authStr) )
  }

  //@private
  getToken = (callback) => {
      let promise = AsyncStorage.getItem('authentication');
      if( callback && typeof callback === 'function' ){
        promise.then(callback, () => { console.log('getToken: ', err) });
      }
      else return promise;
  };

  //@private
  setToken = (token) => {
    var authObj = JSON.parse(atob(token.split('.')[1]));
    authObj.token = token;
    console.log(token, authObj, authObj.token);
    return AsyncStorage.setItem('authentication', JSON.stringify(authObj));
  };

  removeToken = () => {
    AsyncStorage.removeItem('authentication');
  };

  setAuthHeaders = (callback, noNeedToken) => {
    if ( noNeedToken ) {
      callback(); return;
    }
    this.getToken(
      (authentication) => {
        if (authentication) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(authentication).token;
          callback();
        }
        else{ console.log('NO TOKEN PRESENT'); }
      },
      (err) => { console.log('GET TOKEN: ', err); },
    );
  };

  // GET
  get = (url) => {
    let subject = new Rx.Subject();
    this.setAuthHeaders(() => {
      axios.get(url).then(
        (data) => { subject.next(data); },
        (err) => { console.log('GET: ', err); }
      );
    });
    return subject;
  };

  // POST
  post = (url, payload, noNeedToken) => {
    let subject = new Rx.Subject();
    this.setAuthHeaders(() => {
      axios.post( url, this.setParams(payload)).then(
        (resp) => { subject.next(resp); },
        (err) => {
          console.log('POST ERROR: ', Object.keys(err), err.code);
          let error;
          if( err.response ){
            error = err.response.data;
            error.status = err.response.status;
            subject.error(error);
          } else {
            error = err.code;
          }
          subject.error(error);
        }
      );
    }, noNeedToken);
    return subject;
  };

  // PUT
  put = (url, payload) => {
    let subject = new Rx.Subject();
    this.setAuthHeaders(() => {
      axios.put( url, this.setParams(payload)).then(
        (resp) => { subject.next(resp); },
        (err) => { console.log('PUT: ', err); }
      );
    });
    return subject;
  };

  // LOGIN
  login = (user, pw) => {
    return this.post('user/authentication', {username: user, password: pw}, true)
               .do((resp) => { this.setToken(resp.token); })
  };

  setParams = (jsonParams) => {
    let params = new URLSearchParams();
    for(param in jsonParams){
      if( jsonParams.hasOwnProperty(param) ){
        params.append(param, jsonParams[param]);
      }
    }
    return params;
  };

}

export { HttpService };
