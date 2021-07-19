import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class TodoForm extends React.Component{
    constructor(){
        super();
        this.state={
            task:'',
            deadline:'',
            impValue:'',
            emailid:firebase.auth().currentUser.email
        }
    }

    addData= ()=>{
        console.log(this.state.deadline)

        var date=this.state.deadline.replace('/','')

  db.collection('TodoLists').add({
    'task':this.state.task,
    'deadline':this.state.deadline,//date,
    'impValue':this.state.impValue,
    'prog':0,
    'emailid':this.state.emailid,
    'taskid':Math.random().toString(36).substring(7),


})
this.setState({
    task:'',
    deadline:'',
    impValue:'',

})
    }

  render(){
    return (
        <View>
 <TextInput
//style={styles.inputBox}
 placeholder={'Task: '}
 onChangeText={(text)=>{this.setState({task:text})}}/>

<TextInput
//style={styles.inputBox}
 placeholder={'Deadline: (date: yyyy/mm/dd)'}
 onChangeText={(text)=>{this.setState({deadline:text})}}/>
 
 <TextInput
//style={styles.inputBox}
 placeholder={"Plese enter if it is important(yes) or not important(no)"}
 onChangeText={(text)=>{this.setState({impValue:text})}}/>

 <TouchableOpacity onPress={()=>{
     this.addData()
     this.props.navigation.navigate('ToDoList')
 }}>
     <Text>
         Add
     </Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ToDoList')}}>
     <Text>Back</Text>
 </TouchableOpacity>
        </View>
    );
  }
}
