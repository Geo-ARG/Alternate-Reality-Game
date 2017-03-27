import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, Dimensions, BackAndroid } from 'react-native'
import { Container, Content, Left, Right, Body, Title, Text, Button, Header } from 'native-base';
import { fetchEvents, joinGame, clearEvents } from '../actions'
import Carousel from 'react-native-looped-carousel'
import Icon from 'react-native-vector-icons/MaterialIcons';
import catImage from '../assets/loading.gif'
import bg1 from '../assets/pokemonbg2.jpg'
import eventBg1 from '../assets/pokemon4.jpg'
import eventBg2 from '../assets/pokemon2.jpg'
import eventBg3 from '../assets/pokemon3.jpg'
import eventBg4 from '../assets/pokemon5.jpg'

const { height, width } = Dimensions.get('window');

let styles = {
  container: {
    flex: 1, justifyContent: 'center',
  },
  header: {
    height: height * 0.1,
    backgroundColor: '#cc6600'
  },
  content: {
    height: height * 0.9, paddingTop: 0, marginTop: 0
  },
  backgroundImage:{
    flex: 1, width:'100%', height:'100%', position:'absolute'
  },
  swipeView: {
    width: width, padding: 10, backgroundColor: '#353535'
  },
  swipeText: {
    color: '#FFFFFF', textAlign: 'center'
  },
  carousel: {
    height: height * 0.87, width: width
  },
  loading: {
    height: height * 0.9, width: width
  },
  gameEventButton:{
    width: width, height: height * 0.085, backgroundColor: '#cc6600', bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
  },
  gameEventButtonText: {
    color: 'white', alignSelf: 'center', justifyContent: 'center', fontSize: 20, alignItems: 'center'
  },
  signInButton: {
    height: 60, width: width, alignSelf: 'stretch', backgroundColor: 'rgb(138, 208, 49)', margin: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center'
  },
  eventsView: {
    flex: 1, marginLeft:'0.3%', marginRight:'0.3%', marginBottom:'0.2%', height: '90%'
  },
  eventsCardView: {
    flex: 1, width: '100%', height: '100%', marginTop: 5
  },
  listEventView: {
    alignItems: 'center', padding: 10, width: width, height: height, marginTop: 5, backgroundColor: 'rgba(0,0,0, .5)', position: 'absolute'
  },
  listEventTitle: {
    fontSize: 30, color: '#FFF', textAlign: 'center', marginBottom: 20,
  },
  listEventDescription: {
    fontSize: 25, color: '#FFF', textAlign: 'center', marginBottom: 20
  },
  listEventDate: {
    fontSize: 25, color: '#FFF', textAlign: 'center'
  },
  listEventPlace: {
    fontSize: 25, color: '#FFF', marginBottom: 15, textAlign: 'center'
  },
  listEventScore: {fontSize: 25, color: '#F5D76E', padding: 10, fontWeight: 'bold', textAlign: 'center'}
}

class ListEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      size: { width, height }
    }
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  render () {
    BackAndroid.addEventListener('hardwareBackPress', ()=> {
      this.props.navigator.pop()
      return true
    })
    return (
      <Container>
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
            <Title style={{fontSize: 25}}>List of All Events</Title>
          </Right>
        </Header>
        <View style={styles.content}>
          <Image
            style={styles.backgroundImage}
            source={bg1}
          />
          <View>
            {this.props.events.length > 1
            ?
            <View style={styles.swipeView}><Text style={styles.swipeText}>Swipe Left or Right</Text></View>
            :
            false}
            <Carousel
              delay={5000}
              style={styles.carousel}
              bullets={false}
              autoplay
            >
              {this.props.events.length < 1 ? '' :
                this.props.events.map((listevent, index) => {
                  let formattedDate = new Date(listevent.date).toString().split(' ');
                  return (
                    <View key={index} style={styles.eventsView}>
                      { (index+1) % 2 === 0 ? (
                        <Image style={styles.eventsCardView} source={eventBg2} />)
                          :
                        (<Image style={styles.eventsCardView} source={eventBg4} />)
                      }
                      <View style={styles.listEventView}>
                        <Text style={styles.listEventTitle}>{listevent.title}</Text>
                        <Text style={styles.listEventDescription}>{listevent.description}</Text>
                        <Text style={styles.listEventDate}>Date: {formattedDate[0]}, {formattedDate[2]} {formattedDate[1]} {formattedDate[3]}</Text>
                        <Text style={styles.listEventPlace}>Place: {listevent.place}</Text>
                        <Text style={styles.listEventScore}>{listevent.eventScore} pts</Text>
                      </View>
                      <View>
                        <Button style={styles.gameEventButton} onPress={()=>{
                            this.props.joinGame(listevent)
                            this.props.navigator.push({page: 'game'})
                          }}>
                          <Text style={styles.gameEventButtonText}>Join Now</Text>
                        </Button>
                      </View>
                    </View>
                  )
                })
              }
            </Carousel>
          </View>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    joinGame: (eventData) => dispatch(joinGame(eventData)),
    clearEvents: () => dispatch(clearEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEvent)
