import React from 'react';
import {Platform,Dimensions} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';


//screen imports
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Mapview from '../screens/Mapview';
import Login from '../screens/Login';
import Settingsscreen from '../screens/Settingsscreen';
import ProceedScreen from '../screens/ProceedScreen';

//component imports
import MenuDrawer from '../components/MenuDrawer';


//defieing width of screen

const WIDTH= Dimensions.get('window').width;


const DrawerConfig={
  drawerWidth:WIDTH*0.83,
  contentComponent:({navigation})=>{
    return (<MenuDrawer navigation={navigation}/>)
  }
}
const DrawerNavigator= createDrawerNavigator({
  AuthLoading:{
    screen: AuthLoadingScreen
  },
    Home:{
      screen:Mapview
    },
    Settings:{
      screen:Settingsscreen
    },
    Login:{
      screen:Login
    },
    Proceed:{
      screen:ProceedScreen
    },

},
  DrawerConfig
);
export default createAppContainer(DrawerNavigator);
