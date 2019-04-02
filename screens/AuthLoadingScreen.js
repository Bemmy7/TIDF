import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions
} from 'react-native';
const {width : WIDTH}= Dimensions.get('window');
const {height : HEIGHT}= Dimensions.get('window');
var src=require('../assets/SplashScreen.jpg');

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    this.props.navigation.navigate(userToken ? 'Home' : 'Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={src} style={styles.Image}>
      <ActivityIndicator />
          </ImageBackground>


        <StatusBar barStyle="default" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"#fff",
    justifyContent: 'center',
  },
  Image: {
  flex: 1,
  flexDirection: 'column',
  alignItems:'center',
  justifyContent:'center',
  width : WIDTH,
  height : HEIGHT
},
});
