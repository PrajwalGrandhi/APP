import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView,Icon,FlatList} from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class ToDoScreen extends React.Component{
  constructor(){
    super();
    this.state={
      allTasks:[],
      prog:null,

    }
  }

  componentDidMount(){
    this.getTasks()
  }

  getTasks=()=>{
    db.collection('TodoLists').where('emailid','==',firebase.auth().currentUser.email).onSnapshot((snapshot)=>{
      var dt= snapshot.docs.map(document=>document.data())
      db.collection('TodoLists').where('prog','==',0).get().then((snapshot)=>{
   snapshot.forEach(doc=>{
    this.setState({
      allTasks:dt,
      prog:dt.prog
  })
   })
    
      })
console.log(dt)
  })
  }

  updateData=(taskid)=>{
db.collection('TodoLists').
where('emailid','==',firebase.auth().currentUser.email).where('taskid','==',taskid).get().then((snapshot)=>{
 snapshot.forEach(doc=>{db.collection('TodoLists').doc(doc.id).update({
  prog:1
})})

})
  }

  render(){
    return (
        <View>

<TouchableOpacity onPress={()=>{this.props.navigation.navigate('TodoForm')}}>
  <Text>
    Add
  </Text>
</TouchableOpacity>

<ScrollView>
               
    
               <FlatList  data={this.state.allTasks}
                    renderItem={({item,index})=>(
(this.state.allTasks.length!=0)?(
  <View key={index} style={{backgroundColor:'red',borderWidth:2,marginTop:10}}>
                             <Text>{"Task: "+item.task}</Text>
                             <Text>{"Deadline: "+item.deadline} </Text>
                             <TouchableOpacity
                             onPress={()=>{
                               this.updateData(item.taskid)
                             }}
                             >
                               <Text>
                                 Done
                               </Text>
                             </TouchableOpacity>
                        </View>
):(
  <Text>
    No task Scheduled
  </Text>
)
                       
                    )} keyExtractor={(item,index)=>{
                      index.toString();
                    }} 
                    onEndReachedThreshold={0.6}/>
                       </ScrollView>
           

        </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{

  }
})