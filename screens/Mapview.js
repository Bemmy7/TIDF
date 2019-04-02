import React from 'react';
import { StyleSheet, Text, View ,AsyncStorage,Switch ,TouchableOpacity,Dimensions,Image} from 'react-native';
import {MapView,Permissions,Location} from 'expo';
import {Container, Header, Content, Form, Item, Input, Label,Button} from 'native-base';
import firebase from 'firebase';
import {DestinationButton} from '../components/DestinationButton';
import {CurrentLocationButton} from '../components/CurrentLocationButton';
import Driver from '../components/Driver';
import Modal from 'react-native-modal';
import {Ionicons} from '@expo/vector-icons';
var src=require('../assets/off_duty.gif');

//import ImportFromFirebase from '../components/Fire_base';
import MenuButton from '../components/MenuButton';
const WIDTH=Dimensions.get("window").width;

export default class Mapview extends React.Component {
  constructor(props){
    super(props);
    this._bootstrapAsync();
    this.state={
      region:null,
      userType: "",
      userName: "",
      visibleModal: 1,
      switchValue: false,

    }
    this._getLocationAsync();
  }
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
  _renderButtonaccept = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttona}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>A Customer Nearby is Requesting a Ride</Text>
      {this._renderButton('Accept', () => this.setState({ visibleModal: null }))}
      {this._renderButton('Reject', () => this.setState({ visibleModal: null }))}
    </View>
  );
  _renderModalContet = () => (
    <View style={styles.modalContent}>
      <Text>Your Request is Pending Please Wait While We Send Drivers Your Way</Text>
      {this._renderButton('Thanks', () => this.setState({ visibleModal: null }))}

    </View>
  );
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
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var x=userToken.indexOf('@');
    var un=userToken.slice(0,x);
    var ut=userToken.slice(x+1,userToken.length);
    this.setState({userType: ut,userName:un});
  };
  centerMap=()=>{
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
  sendDriverLocation=(username)=>{
      setTimeout(()=>{firebase.database().ref('Drivers/'+"Driver02"+'/Location/').set(
        {
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
        }
      ).then(()=>{
        alert("Bla Bla");
      });},5000);
  }
showModal=()=>{
  return(
    <Modal isVisible={this.state.visibleModal === 2}>
      {this._renderModalContet()}
    </Modal>
  );
}
_handleToggleSwitch = () =>
    this.setState(state => ({
      switchValue: !state.switchValue,
    }));
  mapviewPage=()=>{
    if(this.state.userType==="Passenger"){
      return(
        <View style={styles.container}>
        <TouchableOpacity style={styles.conainer}
        onPress={() => this.setState({ visibleModal: 2 })}>

        <Text style={{fontFamily:'sans-serif-thin',fontSize:21,color:'#545454'}}>{'\u25A0'}       Pick ME           </Text>
        <Ionicons name="md-car" color="black" size={25} style={{alignSelf:'center'}}/>
        </TouchableOpacity>
        <Modal isVisible={this.state.visibleModal === 2}>
          {this._renderModalContet()}
        </Modal>
        <MenuButton navigation={this.props.navigation}/>
          <CurrentLocationButton cb={()=>{this.centerMap()}}/>
          <MapView
            initialRegion={this.state.region}
            showsUserLocation={true}
            showsCompass={true}
            rotateEnabled={true}
            ref={(map)=>{this.map=map}}
            style={{flex:1,zIndex:0}}>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.79999999999 , longitude : 39.2895975  }}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.557341779323194 , longitude : 39.28470339607396}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.552673616187738 , longitude : 39.27568616390472}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.551655100264755 , longitude : 39.290629005785185}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.556323275882805 , longitude : 39.266668931735495}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.5514004708586065 , longitude : 39.279121299969205}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.550084882882837 , longitude : 39.27680839345509}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.552472035127426 , longitude : 39.2761870711052}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.547581009350022 , longitude : 39.284191131591804}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.548599536161506 , longitude : 39.266424179077156}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.548599536161506 , longitude : 39.266424179077156}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.56209475935117 , longitude : 39.27166278568873}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.573467720530537 , longitude : 39.27569908914352}}}/>

          </MapView>
        </View>
      );
    }
    else{
    if( this.state.switchValue==true){
      return(
        <View style={styles.container}>
        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </Modal>


        <Switch
        style={styles.switch}
        onValueChange={this._handleToggleSwitch}
        value={this.state.switchValue}
        />

          <MenuButton navigation={this.props.navigation}/>
          <CurrentLocationButton cb={()=>{this.centerMap()}}/>
          <MapView
            initialRegion={this.state.region}
            showsUserLocation={true}
            showsCompass={true}
            rotateEnabled={true}
            ref={(map)=>{this.map=map}}
            style={{flex:1,zIndex:0}}>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.79999999999 , longitude : 39.2895975  }}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.557341779323194 , longitude : 39.28470339607396}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.552673616187738 , longitude : 39.27568616390472}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.551655100264755 , longitude : 39.290629005785185}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.556323275882805 , longitude : 39.266668931735495}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.5514004708586065 , longitude : 39.279121299969205}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.550084882882837 , longitude : 39.27680839345509}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.552472035127426 , longitude : 39.2761870711052}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.547581009350022 , longitude : 39.284191131591804}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.548599536161506 , longitude : 39.266424179077156}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.548599536161506 , longitude : 39.266424179077156}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.56209475935117 , longitude : 39.27166278568873}}}/>
            <Driver driver={  { uid : "uas[i]" , location : {latitude :8.573467720530537 , longitude : 39.27569908914352}}}/>
          </MapView>
        </View>
      );
    }

     else{
      return(
        <View style={styles.containerof}>
        <Switch
        style={styles.switch}
        onValueChange={this._handleToggleSwitch}
        value={this.state.switchValue}
        />

          <MenuButton navigation={this.props.navigation}/>
          <Text style={{fontSize: 39, fontStyle:"italic"}}>You are Off Duty...</Text>
          <Text style={{fontSize: 22}}>Flip The Switch To start Working</Text>
            <Image
                source={src}
                style={styles.img}
              ></Image>
          </View>

      );
    }
  }
  }

  render() {
    return (
      <View style={styles.container}>
      {this.mapviewPage()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  containerof: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#66C5B1'


  },
  Signup:{
    marginTop:14,
   width: 350,
   color: '#0080ff',
   justifyContent:'center',
   marginLeft: 150,
   borderRadius:25,
 },
 button: {
   backgroundColor: 'lightblue',
   padding: 12,
   margin: 16,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 4,
   borderColor: 'rgba(0, 0, 0, 0.1)',
 },
 button: {
   backgroundColor: 'lightgreen',
   padding: 12,
   margin: 16,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 4,
   borderColor: 'rgba(07, 07, 07, 0.1)',
 },
 modalContent: {
   backgroundColor: 'white',
   padding: 22,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 4,
   borderColor: 'rgba(0, 0, 0, 0.1)',
 },
 bottomModal: {
   justifyContent: 'flex-end',
   margin: 0,
 },
 conainer:{
   zIndex:9,
   position:'absolute',
   flexDirection:'row',
   width:(WIDTH-40),
   height: 60,
   top: 110,
   left:20,
   borderRadius:2,
   backgroundColor:"white",
   alignItems:'center',
   shadowColor:"black",
   elevation: 7,
   shadowRadius: 5,
   shadowOpacity:1
 },
 leftcol:{
   flex :1,
   alignItems:'center'
 },
 centercol:{
   flex :4,
 },
 rightcol:{
   flex :1,
   borderLeftWidth:1,
   borderColor:'#ededed'
 },
 switch:{
   zIndex:9,
   position:'absolute',
   top: 40,
   right:20,

 },
 img:{
   height:400,
   width:WIDTH,
   alignItems: 'center',
   justifyContent: 'center',

 }
});
