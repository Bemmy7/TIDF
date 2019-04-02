import React from 'react';
import { StyleSheet, Text, View,AsyncStorage, } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label,Button} from 'native-base';
import firebase from 'firebase';

import MenuButton from '../components/MenuButton';
export default class Settingsscreen extends React.Component {
  fb=()=>{
    return firebase.database().ref('users/aaa').once('value',(data)=>{ var xxxx=data.toJSON().Usertype;})

  }
  
  render() {

    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation}/>
        <Text>Coming Soon!!!</Text>




      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Signup:{
    marginTop:14,
   width: 350,
   color: '#0080ff',
   justifyContent:'center',
   marginLeft: 150,
   borderRadius:25,
  }
});
