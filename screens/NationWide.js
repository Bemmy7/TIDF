import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';
var src=require('../assets/loading.gif');
import MenuButton from '../components/MenuButton';

const WIDTH= Dimensions.get('window').width;

export default class NationWide extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <MenuButton navigation={this.props.navigation}/>

      <Text>Coming Soon!!!</Text>
        <Image
            source={src}
            style={styles.img}
          ></Image>
      </View>
    );
  }



}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DB6184'


  },
  img:{
    height:400,
    width:WIDTH,
    alignItems: 'center',
    justifyContent: 'center',

  }
});
