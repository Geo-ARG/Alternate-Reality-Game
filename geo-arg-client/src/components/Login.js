import React, { Component } from 'react';
import { connect} from 'react-redux'
import { StyleSheet, View, Image, Text, Dimensions, BackAndroid, TouchableHighlight, AsyncStorage } from 'react-native';
import Carousel from 'react-native-looped-carousel'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { saveUserLogin, saveData } from '../actions'

const Auth0Lock = require('react-native-lock');
const { width, height } = Dimensions.get('window')
const lock = new Auth0Lock({
  clientId: 'xZAFgD4PIqldvAzGrhaNZpWHswGIrC25',
  domain: 'user-login.auth0.com',
  allowedConnections: [
    "Username-Password-Authentication", "google-oauth2", "facebook"
  ],
  rememberLastLogin: true,
  socialButtonStyle: "big",
  theme: {},
  languageDictionary: {
    "title": "ARG Login"
  },
  language: "en"
});

let styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInButton: {
    backgroundColor: '#cc6600',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30
  },
  imgHome: {
    flex: 1,
    width: null,
    height: null,
  },
  play: {
    fontSize: 25, color: 'white', fontWeight: 'bold'
  },
  playView: {
    alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
  },
  backgroundView: {
    backgroundColor: 'rgba(0,0,0,.5)',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  image: {
    flex: 1, width:'100%', height:'100%'
  }
});

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      size: { width, height }
    }
    this.loginForm = this.loginForm.bind(this)
  }

  _onLayoutDidChange = (e) => {
      const layout = e.nativeEvent.layout;
      this.setState({size: {width: layout.width, height: layout.height}})
   }


  loginForm(){
    AsyncStorage.getItem('dataUser', (err, result) => {
      if (result) {
        this.props.saveUserLogin(JSON.parse(result))
        this.props.navigator.push({page: 'home'})
      }
      else {
        lock.show({
          closable: true
        }, (err, profile, token) => {
          if (err) {
            console.log(err);
            return;
          }
          this.props.saveData(profile.nickname, profile.email)
          this.props.navigator.push({page: 'home'});
        });
      }
    });
  }

  render() {
    BackAndroid.addEventListener('LockBack', function() {
      return true;
    })
    return (
      <View style={styles.container} onLayout={this._onLayoutDidChange}>
        <Carousel
           delay={5000}
           style={this.state.size}
           autoplay
        >
          <Image
            style={styles.image}
            source={require('../assets/pokemon5.jpg')}
          />
          <Image
            style={styles.image}
            source={require('../assets/pokemon6.jpg')}
          />
          <Image
            style={styles.image}
            source={require('../assets/pokemon2.jpg')}
          />
          <Image
            style={styles.image}
            source={require('../assets/pokemon3.jpg')}
          />
          <Image
            style={styles.image}
            source={require('../assets/pokemon7.jpg')}
          />
        </Carousel>
        <View style={styles.backgroundView}>
          <Image
            source={require('../assets/logo.png')}
          />
          <TouchableHighlight
            style={styles.signInButton}
            underlayColor='#cc6600'
            onPress={this.loginForm}
          >
            <View style={styles.playView}>
              <Icon size={60} color="white" name="videogame-asset" />
              <Text style={styles.play}>PLAY!</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  saveUserLogin: (dataUserLogin) => dispatch(saveUserLogin(dataUserLogin)),
  saveData: (username, email) => dispatch(saveData(username, email))
})

export default connect(null, mapDispatchToProps)(Login)
