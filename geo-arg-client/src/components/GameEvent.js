import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, ActivityIndicator, Alert, BackAndroid } from 'react-native'
import { Card, CardItem, Button, Content, Container, Header, Left, Right, ProgressBar, Title } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendLocation, watchLocation, scanNearby, fetchQuestList, checkAnswer, setCameraId, createGame } from '../actions'

const {height, width} = Dimensions.get('window');

let styles = {
  container: {flex: 1, justifyContent: 'center'},
  content: {},
  backgroundImg: {width: width, height: height},
  contentView: {
    alignSelf: 'center',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40
  },
  header: {height: height * 0.1, backgroundColor: '#cc6600'},
  scanButton: {borderRadius:10, backgroundColor: '#F4B350'},
  scanText: {color: 'white', paddingLeft: 10, paddingRight: 10, fontSize: 20},
  indicator: {alignItems: 'center', justifyContent: 'center', padding: 8, height: 80},
  eventTitleText: {fontSize: 30, marginTop: 20, fontWeight: 'bold'},
  userNearbyText: {fontSize: 28, fontWeight: 'bold', marginBottom: 10},
  progressCircle: {marginBottom: 10, marginTop: 10},
  progressText: {marginTop: 10},
  longitudeText: {marginBottom: 10},
  latitudeText: {marginTop: 10},
  textInput: {height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'},
  eachQuest: {justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'},
  questListText: {fontSize: 28, fontWeight: 'bold', marginTop: 5},
  questListRow: {backgroundColor: '#F4B350', marginTop: 15, width: width * 0.8, padding: 10, borderRadius: 8, borderBottomWidth: 1, borderBottomColor: '#222222'}
}

class GameEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: '',
      answerMode: false,
      userEventId: '',
      userAnswer: '',
      progressCircle: true,
      scanning: false,
    };
    this.handleVerification = this.handleVerification.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleScan = this.handleScan.bind(this)
  }

  handleSubmit(){
    this.setState({answerMode: false})
    this.props.checkAnswer(this.state.userEventId, this.state.userAnswer)
  }

  handleScan(){
    this.props.scanNearby(this.state.latitude, this.state.longitude)
    this.setState({scanning: true})
    setTimeout(()=>{this.setState({scanning: false})}, 2000)
  }

  handleVerification(userEvent){
    switch (userEvent.Quest.type) {
      case 'Text':
        this.setState({
          answerMode: true,
          userEventId: userEvent.id
        })
        break;
      case 'Coordinate':
          this.props.checkAnswer(userEvent.id, this.props.location.locationId)
        break;
      case 'Photo':
        this.props.setCameraId(userEvent.id)
        this.props.navigator.push({page: 'cameraon'})
        break;
      default:
        return
    }
  }

  componentWillMount(){
    this.props.createGame(this.props.userId, this.props.currentEventId)
  }

  componentDidMount(){
    this.props.fetchQuestList(this.props.userId, this.props.currentEventId)
    setTimeout(() => {
      this.setState({progressCircle: false})
    }, 2000)
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (this.props.location.locationId === 0){
          this.props.sendLocation(position.coords, this.props.userId)
        } else {
          this.props.watchLocation(position.coords, this.props.location.locationId)
        }
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillReceiveProps(nextprops){
    if(nextprops.progress === 1){
      setTimeout(()=>{
        Alert.alert(
        'Congratulations',
        'This Mission is Completed',
        [{text: 'Back To Home', onPress: () => this.props.navigator.push({page: 'home'})}],
        { cancelable: false }
      )},2000)
    }
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchId);
  }

  render(){
    BackAndroid.addEventListener('hardwareBackPress', ()=> {
      this.props.navigator.pop()
      return true
    })
    return(
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
            <Button
              onPress={this.handleScan}
              style={styles.scanButton}>
              {this.state.scanning ?
                <ActivityIndicator animating={true} style={styles.indicator} size="large"/> :
                <Text style={styles.scanText}>Scan Nearby Player</Text>
              }
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
          <View style={styles.contentView}>
            <Text style={styles.eventTitleText}>{this.props.currentEvent.title}</Text>
            <Text style={styles.progressText}>Progress: </Text>
            <Progress.Circle style={styles.progressCircle} progress={this.props.progress} size={80} showsText={true} indeterminate={this.state.progressCircle}/>
            <Text style={styles.latitudeText}>Latitude: {this.state.latitude}</Text>
            <Text style={styles.longitudeText}>Longitude: {this.state.longitude}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            <Text style={styles.userNearbyText}>User Nearby</Text>
            <View>
              {this.props.location.nearbyUser.length < 1 ? <Text>No other user nearby</Text> : this.props.location.nearbyUser.map((nearby, index) => {
                if(typeof nearby.Users[0] === 'object'){
                  return nearby.Users[0].id === this.props.userId ? null : (
                    <View key={index} style={{padding: 5, width: width * 0.7, paddingLeft: 30, paddingRight: 30, backgroundColor: '#FFFFFF', borderRadius: 8, margin: 5}}>
                      <Text>{nearby.Users[0].username}</Text>
                    </View>
                  )
                }
              })}
            </View>
            <Text style={styles.questListText}>Quest List</Text>
              <View>
              {this.props.userEvent.length < 1 ? null : this.props.userEvent.map((quest, index) => {
                let input
                if (quest.id === this.state.userEventId && this.state.answerMode){
                  input = (
                    <TextInput
                      style={styles.textInput}
                      onChangeText={userAnswer => this.setState({userAnswer})}
                      value={this.state.userAnswer}
                      maxLength={25}
                      blurOnSubmit={true}
                      autoFocus={true}
                      onSubmitEditing={this.handleSubmit}
                      onBlur={() => this.setState({answerMode: false})}
                      returnKeyType={'send'}
                    />
                  )
                }
                let complete = quest.completion ? {color: 'grey', textAlign: 'center'} : {color: 'white', textAlign: 'center'}
                return (
                  <View key={index} style={styles.questListRow}>
                    <TouchableOpacity onPress={() => this.handleVerification(quest)} disabled={quest.completion}>
                      <View style={styles.eachQuest}>
                        <View>
                          <Text style={complete}>{quest.Quest.title} </Text>
                          <Text style={complete}>{quest.Quest.task} </Text>
                          <Text style={complete}>Submit Type : {quest.Quest.type} </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {input}
                  </View>
                )
              })}
              </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    location : state.location,
    userId : state.profileUser.userData.User.id,
    currentEventId : state.currentEvent.id,
    currentEvent: state.currentEvent,
    userEvent : state.userEvent,
    progress  : state.userEvent.length === 0 ? 0 : state.userEvent.filter(x => x.completion).length / state.userEvent.length,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({sendLocation, watchLocation, scanNearby, fetchQuestList, checkAnswer, setCameraId, createGame}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEvent)
