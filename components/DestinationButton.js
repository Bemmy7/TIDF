import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Mapview from '../screens/Mapview';

const WIDTH=Dimensions.get("window").width;

export const DestinationButton= function(props){

  return(
    <TouchableOpacity style={styles.container} onPress={()=>{this.showModal()}}>
    <View style={styles.leftcol}>
          <Text style={{fontSize:8}}>{'\u25A0'}</Text>
    </View>
    <View style={styles.centercol}>
          <Text style={{fontFamily:'sans-serif-thin',fontSize:21,color:'#545454'}}>Pick ME</Text>

    </View>
    <View style={styles.rightcol}>
          <Ionicons name="md-car" color="black" size={25} style={{alignSelf:'center'}}/>

    </View>
    </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
  container:{
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
  }

});
