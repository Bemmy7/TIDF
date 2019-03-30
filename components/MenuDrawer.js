import React from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
const WIDTH=Dimensions.get('window').width;
const HEIGHT=Dimensions.get('window').height;
export default class MenuDrawer extends React.Component{
  navLink(nav,text){
    return(
      <TouchableOpacity style={{height:50}} onPress={()=>this.props.navigation.navigate(nav)}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    )
  }
  render(){
    return(
      <View style={styles.container}>
        <Text>Menu Drawer</Text>
        <View style={styles.toplinks}>
          <View>
          </View>
        </View>
        <View style={styles.bottomlinks}>
        {this.navLink("Home","Home")}
        {this.navLink("Links","Links")}
        {this.navLink("Settings","Settings")}


        </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black',
  },
  link:{
    flex:1,
    fontSize:21,
    padding:6,
    paddingLeft:14,
    margin:5,
    textAlign:'left',
  },
  toplinks:{
    height:150,
    backgroundColor: "black",

  },
  bottomlinks:{
    flex:1,
    backgroundColor:"white",
    paddingTop:10,
    paddingBottom:450,
  },
});
