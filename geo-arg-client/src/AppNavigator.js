import React from 'react'
import { Provider } from 'react-redux'
import { Navigator } from 'react-native';

import store from './store/storeConfig'

import { Loading1, Loading2, Home, Login, GameEvent, ListEvent, EventMap, Profile, Help, CameraOn } from './components'

export default class AppNavigator extends React.Component {
  sceneRender(route, navigator){
    switch(route.page){
      case 'loading1':
        return <Loading1 navigator={navigator}/>
      case 'login':
        return <Login navigator={navigator}/>
      case 'home':
        return <Home navigator={navigator}/>
      case 'game':
        return <GameEvent navigator={navigator}/>
      case 'event':
        return <ListEvent navigator={navigator}/>
      case 'map':
        return <EventMap navigator={navigator}/>
      case 'profile':
        return <Profile navigator={navigator}/>
      case 'help':
        return <Help navigator={navigator}/>
      case 'cameraon':
        return <CameraOn navigator={navigator}/>
      default:
        return <Loading1 navigator={navigator}/>
    }
  }
  render(){
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{page: 'loading1'}}
          renderScene= {this.sceneRender.bind(this)}
        />
      </Provider>
    )
  }
}
