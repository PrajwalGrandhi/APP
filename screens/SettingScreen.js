import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config'

export default class SettingScreen extends React.Component{
  constructor(){
    super();
    this.state={
      emailid:firebase.auth().currentUser.email,
      pass:'',
      name:'',
      phoneno:0,
      userid:'',
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData=()=>{
   db.collection('UserDetails').where('emailid','==',this.state.emailid).get().then(
    snapshot=>{snapshot.forEach(doc=>{
      var data=doc.data()
      this.setState({
          name:data.name,
          phoneno:data.phone_no,
          pass:data.password,
          userid:doc.id,

      });
  })}
   )
  }

  updateData=()=>{
    db.collection('UserDetails').doc(this.state.userid).update({
      "emailid":this.state.emailid,
      "name":this.state.name,
      "phone_no":this.state.phoneno,
      "password":this.state.pass,
      
});
Alert.alert("changes saved");
  }

  render(){
    return (
    <View>
      <Text style={{alignSelf:'center',fontSize:40,}}>
          Settings
      </Text>
      <TextInput
//style={styles.inputBox}
 placeholder={this.state.name}
 onChangeText={(text)=>{this.setState({name:text})}}/>

  <TextInput
//style={styles.inputBox}
 placeholder={this.state.emailid}
 keyboardType={"email-address"}
 onChangeText={(text)=>{this.setState({emailid:text})}}/>

  <TextInput
//style={styles.inputBox}
 placeholder={this.state.phoneno}
 keyboardType={"numeric"}
 onChangeText={(text)=>{this.setState({phoneno:text})}}/> 

 <TextInput
//style={styles.inputBox}
 placeholder={this.state.pass}
 secureTextEntry={true}
 onChangeText={(text)=>{this.setState({pass:text})}}/>

 <TouchableOpacity onPress={()=>{
     this.updateData()
 }}>
     <Text>
         Save Changes
     </Text>
 </TouchableOpacity>
  </View>

    );
  }
}
