import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyBZzpybtAsxNG5TLZxE9vDhk6pMMprsE1g",
    authDomain: "studyapp-da3f0.firebaseapp.com",
    projectId: "studyapp-da3f0",
    storageBucket: "studyapp-da3f0.appspot.com",
    messagingSenderId: "220466679266",
    appId: "1:220466679266:web:041aa3e44bfec1088abdbb"
  };

  if(!firebase.apps.length){ 
    firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase.firestore();