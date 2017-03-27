import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, Dimensions, Image, BackAndroid } from 'react-native'
import MapView from 'react-native-maps'
import { fetchEvents } from '../actions'
import { Container, Header, Left, Right, Button, Title, Content, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('window');

const styles = {
  map: {
    height: height * 0.87,
    width: width
  },
  loading: {
    height: height * 0.9,
    width: width
  },
  header: {
    height: height * 0.1,
    backgroundColor: '#cc6600'
  },
  content: {
    height: height * 0.9
  }
}

class EventMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      region: {
        latitude: -6.262996976002624,
        longitude: 106.78270787000658,
        latitudeDelta: 0.012930741167222592,
        longitudeDelta: 0.009000487625598907
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  onRegionChange(region){
    this.setState({ region })
  }

  componentDidMount () {
    this.props.fetchEvents()
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
            <Title style={{fontSize: 25}}>Events Around You</Title>
          </Right>
        </Header>
        <Content style={styles.content}>
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            showsUserLocation={true}
            showsMyLocationButton={true}
            loadingEnabled={true}
          >
          {this.props.events.map((marker, index) => {
            let coordinates = marker.geolocation.coordinates
            return (
              <MapView.Marker
                key={index}
                coordinate={{latitude: coordinates[0], longitude: coordinates[1]}}
                title={marker.title}
                description={`${marker.place}, ${marker.description}`}
              />
            )}
          )}
          </MapView>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchEvents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMap)
