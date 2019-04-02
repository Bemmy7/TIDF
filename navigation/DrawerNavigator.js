import React from 'react';
import {Platform,Dimensions,TouchableOpacity} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';


//screen imports
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Mapview from '../screens/Mapview';
import Login from '../screens/Login';
import Settingsscreen from '../screens/Settingsscreen';
import NationWide from '../screens/NationWide';
import ProceedScreen from '../screens/ProceedScreen';
import Popup from '../screens/Popup';

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
    cs:{
      screen:NationWide
    },
    Login:{
      screen:Login
    },
    Settings:{
      screen:ProceedScreen
    },

},
  DrawerConfig
);
export default createAppContainer(DrawerNavigator);
