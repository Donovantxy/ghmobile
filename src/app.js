import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Header } from './Components/Common/index';
import { HttpService } from './Services/index';

class ghApp extends Component {

  componentWillMount() {
    this.http = new HttpService();
    // this.http.login('ciao21@ciao.com', 'ciaociA0')
    // .subscribe((resp) => {
    //   console.log(resp);
    // });
    this.http.get('user/adult').subscribe((data) => { console.log(data); });
  }

  render () {
    return (
      <View>
        <Header headerText="Login" />
        <Text>An App!</Text>
      </View>
    )
  }

}

export default ghApp;
