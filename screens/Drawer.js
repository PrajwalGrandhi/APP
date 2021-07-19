import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView,Image} from 'react-native';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';
// import { Avatar } from 'react-native-elements'
// import * as ImagePicker from 'expo-image-picker'
// import * as Permissions from 'expo-permissions'

export default class Drawer extends React.Component{

    constructor(){
        super()
        this.state={
            img:'#',
            name:'',
            url:'',
            useremail:firebase.auth().currentUser.email
        }
    }

//     uploadPicture=async (url,useremail)=>{
// var abc=await (await fetch(url)).blob()

// firebase.storage().ref()
// .child('user_profiles/'+useremail/*+".png"*/).put(abc).
// then((Response)=>{this.fetchPicture(useremail)})

// var con=URL.createObjectURL(abc)
// return <Image style ={{height:100,width:100}} source={{uri:con}}/>

//     }

//     choosePicture=async ()=>{
// const {canceled,url}=await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.All,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
// })
// if(!canceled){
// this.uploadPicture(url,this.state.useremail)
// this.setState({
//     img:url,
// })
// }
//     }

//     fetchPicture=(useremail)=>{
//         firebase.storage().ref()
//         .child('user_profiles/'+useremail/*+".png"*/).getDownloadURL().then((url)=>{
//             this.setState({
//                 img:url
//             })
//         })
//         .catch((error)=>{console.log(error)})
//     }

    
//     getUserDetails=()=>{
//         db.collection('UserDetails').where('emailid','==',this.state.useremail)
//         .onSnapshot((snapshot)=>{
//         snapshot.forEach(doc=>{
//             this.setState({
//                 name:doc.data().name,/*img:doc.data().image*/
//             })
//             })
//         })
//             }

//     componentDidMount(){
//         this.getUserDetails()
//         this.fetchPicture(this.state.useremail)
//     }

    render(){
        return(
            <View>
 
                {/* <Avatar
  rounded
  style={{height:50,width:50,alignSelf:'center'}}
  onPress={()=>{
    this.choosePicture()
}}
  showEditButton
  source={{
    uri:
    this.state.img
  }}
/>
</View>

<Text style={{alignSelf:'center'}}>{this.state.name}</Text> */}
                <View>
            <DrawerItems {...this.props}/>
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('LoginScreen');
                firebase.auth().signOut();
        }}>
                <Text>LOG OUT</Text>
            </TouchableOpacity>
                </View>
                
                
            </View>
        );
    }
}