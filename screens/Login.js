import React from 'react';
import {View,StyleSheet,Dimensions,TextInput,Text,AsyncStorage} from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label,Button} from 'native-base';
import firebase from 'firebase';
import AuthLoading from '../screens/AuthLoadingScreen';

const {width : WIDTH}= Dimensions.get('window');
const {height : HEIGHT}= Dimensions.get('window');

export default class Login extends React.Component{


  signuserup = (email,password)=>{
    try{
      if(password.length< 6){

      alert("Please Enter at least 6 letters");
      return;
    }
    else{

      firebase.auth().createUserWithEmailAndPassword(email,password);
      var t=email;
      var x=t.indexOf('@');
      var un=t.slice(0,x);
      this.AddToDatabase(un);
      console.log(this.state.userToken);

      console.log("user")

    }

  }
  catch(error){
    alert("An error Occured");
    return;
  }
  }
  loguserin=(email,password)=>{
    try{
      if(email.length<1 || password.length<1){
        alert("Enter Email or Password Properly");
        return;
      }
      else{

        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
          console.log("Success");
          var t=email;
          var x=t.indexOf('@');
          var un=t.slice(0,x);
          this.setState({ userToken: un });
          var ut="0";
          console.log(this.state.userToken);
          firebase.database().ref('users/'+un).once('value',(data)=>{if(data.toJSON().Usertype=='Passenger'){{ut="Passenger"};} else{ut="Driver";};}).then(()=>{}).catch((error)=>{alert("ERROR" + error);});
          setTimeout(()=>{this.setState({ userToken: un+'@'+ut });},5000);//Delay 5 Sec Before applying



        }).catch((error)=>{
          alert(error);
        })
      }
    }
    catch(error){
      alert("Invalid Username or Password");
      return;
    }
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken',this.state.userToken ).then(()=>{
      this.props.navigation.navigate('AuthLoading');
      }).catch((error)=>alert("an error Occoured"));
  };
  AddToDatabase=(user)=>{

    var x='users/'+ user;
   firebase.database().ref(x).set(
     {
       Usertype: 'Passenger',
       username: user
     }
   ).then(()=>{
     console.log("Success");
   }).catch((error)=>{
alert("An Error Occourd Please Try Again.");
   });
}


  render() {
    return (
      <View style={styles.container}>
          <TextInput
          placeholder="Email"
          style={styles.TextInput}
          onChangeText={(email)=>{this.setState({email})}}>
          </TextInput>

          <Text></Text>

          <TextInput

          placeholder="Password"
          secureTextEntry={true}
          style={styles.TextInput}
          onChangeText={(password)=>{this.setState({password})}}>

          </TextInput>
          <Text></Text>
           <Button
            success
            style={styles.login}
            onPress={()=>{this.loguserin(this.state.email,this.state.password); this._signInAsync()}}
            >
            <Text> Login </Text>
            </Button>
           <Button
           style={styles.Signup}
           onPress={()=>{this.signuserup(this.state.email,this.state.password)}}
           >
          <Text> Signup </Text>
          </Button>


      </View>
    );
  }

 }
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems:'center',
     justifyContent:'center',
     marginTop: 24,
   },
   TextInput: {
     width:WIDTH-55,
     height:45,
     borderRadius:25,
     backgroundColor: '#rgba(0,6,26,0.7)',
     color:'#000',
     fontSize:16,
     marginHorizontal: 25,
     paddingLeft: 25,
   },
   login:{
    width: WIDTH-205,
    justifyContent:'center',
    marginLeft: WIDTH/2-225,
    borderRadius:25,
  },
   Signup:{
     marginTop:14,
    width: WIDTH-205,
    color: '#0080ff',
    justifyContent:'center',
    marginLeft: WIDTH/2-225,
    borderRadius:25,
   }
 });
