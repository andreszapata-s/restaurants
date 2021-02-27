import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyA84v1Lg3oIHtaEL5uArABi-ZIeqk9JEco",
    authDomain: "restaurants-989f0.firebaseapp.com",
    projectId: "restaurants-989f0",
    storageBucket: "restaurants-989f0.appspot.com",
    messagingSenderId: "1010163798503",
    appId: "1:1010163798503:web:4efce8b26f20583a59ad42"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)