import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class NotificationScreen extends React.Component{
  constructor(){
    super();
    this.state={
      allTasks:[],
      emailid:firebase.auth().currentUser.email,
      deadline:'',
      today:firebase.database.ServerValue.TIMESTAMP,
      prog:null,
    }
  }

  componentDidMount(){
    this.getTasks()
  }

  getTasks=()=>{
db.collection('TodoLists').where('emailid','==',this.state.emailid).where('prog','==',0).onSnapshot((snapshot)=>{
  var dt;
  snapshot.docs.map(doc=>{dt =doc.data()})
     this.setState({
       allTasks:dt,
       prog:dt.prog,
       deadline:dt.deadline
   })
  console.log(dt)
})
}
  
dateDiffToString(a, b){
  var  diff = Math.abs(a - b); 
  var ms = diff % 1000; 
   diff = (diff - ms) / 1000;
   var ss = diff % 60; 
   diff = (diff - ss) / 60;
   var mm = diff % 60; 
   diff = (diff - mm) / 60 
   var hh = diff % 24;
    var days = (diff - hh) / 24 
  return days;
 }

 dateCompare(d1, d2){
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  if(date1 > date2){
      console.log(`${d1} is greater than ${d2}`)
  } else if(date1 < date2){
      console.log(`${d2} is greater than ${d1}`)
  } else{
      console.log(`Both dates are equal`)
  }
  console.log(date1-date2)
}

  render(){
    var date=this.state.deadline.split('/')
    console.log(date)
    const deadlineTimestamp= new Date( date[2], date[1], date[0]);
    // console.log(deadlineTimestamp.getTime());
    var d=this.dateDiffToString(deadlineTimestamp,new Date().getTime())
    console.log(d)

    this.dateCompare(new Date(),new Date())
    return (
        <View>
<Text>
  {this.state.deadline}
</Text>
        </View>
    );
  }
}
