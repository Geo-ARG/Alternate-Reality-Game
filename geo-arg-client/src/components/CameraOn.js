import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, BackAndroid } from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-camera';
import { RNS3 } from 'react-native-aws3'
import { bindActionCreators } from 'redux'
import { updateAnswerPhoto } from  '../actions'
// import config from '../../cameraOptionsConfig'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'orange',
    borderRadius: 5,
    color: 'white',
    padding: 10,
    margin: 40
  }
})

class CameraOn extends Component {
  render() {
    BackAndroid.addEventListener('hardwareBackPress', ()=> {
      this.props.navigator.pop()
      return true
    })
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>CAPTURE</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
    .then((data) => {
      var nameImage = new Date()
      var imageKey = Math.floor(Math.random()*100)
      const file = {
        uri: data.path,
        name: `${nameImage}${imageKey/3}.jpg`,
        type: 'image/jpeg'
      }
      const options = {
        keyPrefix : 'photos/',
bucket : 'arg-images',
region : 'ap-southeast-1',
accessKey : 'AKIAIUDIQ74DSKRHRPRQ',
secretKey : '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'
      }
      RNS3.put(file, options).then(response => {
        if (response.status !== 201) {
          throw new Error('Failed to upload image to S3', response);
        }
        this.props.updateAnswerPhoto(this.props.questCameraId, response.body.postResponse.location)
        if(response.body.postResponse.location){
          this.props.navigator.pop()
        }
      })
    })
    .catch(err => console.error(err));
  }
}

const mapStateToProps = state => {
  return  {
    questCameraId : state.questCameraId
  }
}

const mapDisPatchToProps = (dispatch) => {
  return bindActionCreators({updateAnswerPhoto}, dispatch)
}

export default connect(mapStateToProps, mapDisPatchToProps)(CameraOn)
