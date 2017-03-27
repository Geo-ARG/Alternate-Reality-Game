import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

export default class Loading1 extends Component {
  componentDidMount(){
    setTimeout(()=>{
      this.props.navigator.push({page:"login"})
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../../assets/loading.gif")} style={styles.imgHome} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgHome: {
    flex: 1,
    width: null,
    height: null,
  },
  buttonHome: {
    height: 60,
  },
  todos: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  searchForm: {
    marginTop: 20,
  }
});
