import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {MapView,Permissions,Location} from 'expo';
import {DestinationButton} from '../components/DestinationButton';
import {CurrentLocationButton} from '../components/CurrentLocationButton';
import Driver from '../components/Driver';
import MenuButton from '../components/MenuButton';

export default class Mapview extends React.Component {
  constructor(props){
    super(props);
    this.state={
      region:null,
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
        <DestinationButton/>
        <MenuButton navigation={this.props.navigation}/>

        <CurrentLocationButton cb={()=>{this.centerMap()}}/>
        <MapView
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={true}
          ref={(map)=>{this.map=map}}
          style={{flex:1,zIndex:0}}>
        <Driver driver={{uid:'uid', location: {latitude:8.5641,longitude:39.2895}}}/>
        </MapView>

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
