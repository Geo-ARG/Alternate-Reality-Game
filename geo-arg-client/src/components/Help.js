import React from 'react';
import { View, Text, Dimensions, Image, BackAndroid } from 'react-native';
import { Container, Header, Left, Right, Button, Title, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { height, width } = Dimensions.get('window');

const styles = {
  header: {
    height: height * 0.1,
    backgroundColor: '#cc6600'
  },
  content: {
    height: height * 0.9
  },
  contentView: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,.7)',
    width: width,
    height: height
  },
  backgroundImg: {
    width: width,
    height: height
  },
  textView: {
    marginRight: 25,
    marginLeft: 25,
    marginTop: 20
  },
  textStyle1: {
    color: 'white', fontSize: 40, textAlign: 'center', fontWeight: 'bold', marginBottom: 20
  },
  textStyle2: {
    color: 'white', fontSize: 25, textAlign: 'justify', marginBottom: 10, fontWeight: 'bold'
  },
  textStyle3: {
    color: 'white', fontSize: 18, textAlign: 'justify'
  },
  textStyle4: {
    color: 'white', fontSize: 18, textAlign: 'justify', fontWeight: 'bold'
  },
  textStyle5: {
    color: 'white', fontSize: 24, textAlign: 'justify', marginTop: 10, marginBottom: 10, fontWeight: 'bold'
  }
}

export default class Help extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    BackAndroid.addEventListener('hardwareBackPress', ()=> {
      this.props.navigator.pop()
      return true
    })
    return (
      <Container style={{backgroundColor: '#F5F5F5'}}>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigator.pop()}
            >
              <Icon size={35} color={'white'} name='arrow-back' />
              <Title style={{fontSize: 25}}> Back</Title>
            </Button>
          </Left>
          <Right>
            <Title style={{fontSize: 25}}>Game Guides</Title>
          </Right>
        </Header>
        <Content style={styles.content}>
          <Image
            style={styles.backgroundImg}
            source={require('../assets/pokemonbg2.jpg')}
          />
          <View style={styles.contentView}>
            <View style={styles.textView}>
              <Text style={styles.textStyle1}>
                Geo-ARG Guides
              </Text>
              <Text style={styles.textStyle2}>
                Game objectives:
              </Text>
              <Text style={styles.textStyle3}>
                1. Find events near you and join them (you need to be near enough to be able to join the event)
              </Text>
              <Text style={styles.textStyle3}>
                2. Complete chain of quests that provided in each event.
              </Text>
              <Text style={styles.textStyle3}>
                3. Compete with your friends to get highest score and most achievements
              </Text>
              <Text style={styles.textStyle5}>
                Type of Quests:
              </Text>
              <Text style={styles.textStyle4}>
                Text:
              </Text>
              <Text style={styles.textStyle3}>
                Submit secret answer to complete the quest
              </Text>
              <Text style={styles.textStyle4}>
                Coordinate:
              </Text>
              <Text style={styles.textStyle3}>
                Go to a specific place to complete the quest
              </Text>
              <Text style={styles.textStyle4}>
                Photo:
              </Text>
              <Text style={styles.textStyle3}>
                Submit a photo and wait for admin to verify and complete the quest
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
