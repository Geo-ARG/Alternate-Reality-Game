import React, { Component } from 'react';
import { View, Image, Text, BackAndroid, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { height, width } = Dimensions.get('window');

var styles = {
  button: {
    borderRadius:10,
    backgroundColor: '#F4B350',
    marginTop: 20,
    height: height * 0.2,
    width: width * 0.4,
    alignSelf: 'center',
    flexDirection: 'column',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingLeft: width * 0.06,
    paddingRight: width * 0.06,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    height: 169,
    width: 151
  },
  headerIcon: {
    alignSelf: 'center',
    height: 70,
    width: 70
  },
  contentView: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    width: width,
    height: height
  },
  backgroundImg: {
    width: width,
    height: height
  },
  header: {
    height: height * 0.1,
    backgroundColor: '#cc6600'
  },
  content: {
    height: height * 0.9
  }
}

export default class Home extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    BackAndroid.addEventListener('LockBack', function() {
      return true;
    })
    return (
      <Container style={{backgroundColor: '#F5F5F5'}}>
        <Header style={styles.header}>
          <Left>
            <Image
              style={styles.headerIcon}
              source={require('../assets/logo.png')}
            />
          </Left>
          <Body>
            <Title style={{fontSize: 25}}>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <Image
            style={styles.backgroundImg}
            source={require('../assets/pokemonbg2.jpg')}
          />
          <View style={styles.contentView}>
            <View style={{marginTop: 20}}>
              <Image
                style={styles.icon}
                source={require('../assets/logo.png')}
              />
            </View>
            <View style={styles.buttonRow}>
              <Button
                block warning style={styles.button}
                onPress={() => this.props.navigator.push({
                  page: 'event'
                })}
              >
                <Icon size={60} color="white" name="event" />
                <Text style={styles.buttonText}>Browse All Events </Text>
              </Button>
              <Button
                block warning style={styles.button}
                onPress={() => this.props.navigator.push({
                  page: 'map'
                })}
              >
                <Icon size={60} color="white" name="add-location" />
                <Text style={styles.buttonText}>Search Events</Text>
              </Button>
            </View>
            <View style={styles.buttonRow}>
              <Button
                block warning style={styles.button}
                onPress={() => this.props.navigator.push({
                  page: 'profile'
                })}
              >
                <Icon size={60} color="white" name="account-circle" />
                <Text style={styles.buttonText}>My Profile </Text>
              </Button>
              <Button
                block warning style={styles.button}
                onPress={() => this.props.navigator.push({
                  page: 'help'
                })}
              >
                <Icon size={60} color="white" name="help" />
                <Text style={styles.buttonText}>How to Play </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
