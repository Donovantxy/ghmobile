import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Rx from 'rxjs/Rx';

class HttpService {

  constructor(envStr) {
    this.__proto__.ghtnk = null;
    axios.defaults.baseURL = this.getBaseUrlApi()[envStr];
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

  getBaseUrlApi = () => {
    return {
      DEV : 'https://dev-api.gohenry.co.uk/',
      TEST: 'https://test-api.gohenry.co.uk/',
      QA  : 'https://qa-api.gohenry.co.uk/',
      LIVE: 'https://api.gohenry.co.uk/',
    };
  }

  switchBaseUrlApi(envStr) {
    axios.defaults.baseURL = this.getBaseUrlApi()[envStr];
  }

  getToken = (callback) => {
      let promise = AsyncStorage.getItem('ghtkn');
      if( callback ){
        promise.then(callback, () => { console.log('getToken: ', err) });
      }
      else return promise;
  };

  setToken = (token) => {
    return AsyncStorage.setItem('ghtkn', token);
  };

  removeToken = () => {
    AsyncStorage.removeItem('ghtkn');
  };

  setAuthHeaders = (callback, noNeedToken) => {
    if ( noNeedToken ) {
      callback(); return;
    }
    this.getToken(
      (token) => {
        if (token) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
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
    this.setAuthHeaders((token) => {
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
          console.log('POST ERROR');
          let error = err.response.data;
          error.status = err.response.status;
          subject.error(error);
        }
      );
    }, noNeedToken);
    return subject;
  };

  // PUT
  put = (url, payload) => {
    let subject = new Rx.Subject();
    this.setAuthHeaders((token) => {
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
