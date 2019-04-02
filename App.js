import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
} from 'react-native';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
      apiKey: "AIzaSyCVMbAnEmgp9eyGNl-skx4aDMUWLhe13VY",
      authDomain: "tidf-b6ae9.firebaseapp.com",
      databaseURL: "https://tidf-b6ae9.firebaseio.com",
      projectId: "tidf-b6ae9",
      storageBucket: "tidf-b6ae9.appspot.com",

};

firebase.initializeApp(firebaseConfig);

import {MapView,Permissions,Location} from 'expo';
import {DestinationButton} from './components/DestinationButton';
import {CurrentLocationButton} from './components/CurrentLocationButton';
import DrawerNavigator from './navigation/DrawerNavigator';
import Driver from './components/Driver';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      region:null,
      userToken: "",

    }
    this._getLocationAsync();
  }



  _getLocationAsync = async() => {
    let {status}=await Permissions.askAsync(Permissions.LOCATION);
    if(status!=='granted'){
      console.log('Permission Denied');}
  let location =await Location.getCurrentPositionAsync({ enabledHighAccuracy: true} );
  let region={
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta:0.041,
    longitudeDelta:0.041,
  }

  this.setState({ region : region});
  }

  centerMap(){
    const{
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
    }=this.state.region;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <DrawerNavigator/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
