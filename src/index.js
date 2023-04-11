import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAmo6MtuPFjDI6iYw506RmXPmDJYtvKsvY",
    authDomain: "cart-d4c0c.firebaseapp.com",
    projectId: "cart-d4c0c",
    storageBucket: "cart-d4c0c.appspot.com",
    messagingSenderId: "576899977882",
    appId: "1:576899977882:web:3ebf9d16f34cab9068c523"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App />, document.getElementById('root'));
