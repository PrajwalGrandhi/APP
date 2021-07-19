import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class AuthScreen extends React.Component{
constructor(){
    super();
    this.state={
        emailid:'',
        pass:'',
        visibilty:false,
        name:'',
        phoneno:0,
        conpass:'',
    }
}

login=async(email,pass)=>{
    if(email && pass){
         try{
    const data = await  firebase.auth().signInWithEmailAndPassword(email,pass).then((Response)=>{
        return this.props.navigation.navigate('PomodoroTimer');//Alert.alert( "logged in", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
    });
            
      if(data){
         this.props.navigation.navigate('PomodoroTimer');
      } 
   }catch(error){
     if(error.code=='auth/user-not-found'){
      Alert.alert( "use doesnt exist", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
     }
     else if(error.code=='auth/invalid-email'){

      Alert.alert( "email id invalid", "eamilid envalid", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
     }
   }
 }
 else{
   Alert.alert( "Please enter your email id and password", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
 }
}

signup=async(email,pass,conpass)=>{
  if(pass!=conpass){
    Alert.alert("password mismatched");
  }
    else{
      try{  
        firebase.auth().createUserWithEmailAndPassword(email,pass).then((response)=>{
          
            db.collection('UserDetails').add({
              'phone_no':this.state.phoneno,
              'emailid':this.state.emailid,
              'name':this.state.name,
              'password':this.state.conpass,
              'userid':Math.random().toString(36).substring(10),
            })
        return this.props.navigation.navigate('DonationScreen');
    })
}
  catch(error){
      //console.log("asfd");
      return Alert.alert( error.message+","+error.code, "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
  } 
    }
}

displayForm=()=>{
    return(
      <View>
      <Modal
        visible={this.state.visibilty}
        animationType="slide"
        transparent={true}
      >
        <ScrollView>
          <KeyboardAvoidingView>
          <TextInput
        //style={styles.inputBox}
         placeholder="Enter your name: "
         onChangeText={(text)=>{this.setState({name:text})}}/>

          <TextInput
        //style={styles.inputBox}
         placeholder="email ID"
         keyboardType="email-address"
         onChangeText={(text)=>{this.setState({emailid:text})}}/>

          <TextInput
        //style={styles.inputBox}
         placeholder="Your Phone no: "
         onChangeText={(text)=>{this.setState({phoneno:text})}}/>

         <TextInput
        //style={styles.inputBox}
         placeholder="password"
         secureTextEntry={true}
         onChangeText={(text)=>{this.setState({pass:text})}}/>
            <TextInput
        //style={styles.inputBox}
         placeholder="confirm password"
         secureTextEntry={true}
         onChangeText={(text)=>{this.setState({conpass:text})}}/>

      <TouchableOpacity
       onPress={()=>{
          this.signup(this.state.emailid,this.state.pass,this.state.conpass)
          this.setState({visibilty:false});
         }}>        
          <Text>Submit</Text>

      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{
        this.setState({visibilty:false})
      }}>
        <Text>CANCEL</Text>
      </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
      </View>
    );
  }


  render(){
    return (
      <View style={styles.welcome}>
       {this.displayForm()}

       <TextInput
          
          style={styles.instructions}
          placeholder="email ID"
          keyboardType="email-address"
          onChangeText={(text)=>{this.setState({emailid:text})}}/>

          <TextInput
         style={styles.instructions}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text)=>{this.setState({pass:text})}}/>

       <TouchableOpacity
         //style={styles.scanButton}
         onPress={()=>{
          this.login(this.state.emailid,this.state.pass)
         }}>
         <Text>Login</Text>
       </TouchableOpacity>
               
       <TouchableOpacity
        onPress={()=>{
          this.setState({
            visibilty:true,

          });

          }}>        
           <Text>SignUp</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: RFValue(24, 580),
        textAlign: "center",
        margin: 10,
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    textAlign: "center",
    alignSelf:'center',
    color: "#333333",
    marginBottom: RFValue(5),
    fontSize: RFPercentage(2),
    width:200,
    borderColor:'black',
    borderRadius:RFValue(100)
  },
});
