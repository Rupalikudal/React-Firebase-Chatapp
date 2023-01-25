import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtjrceRNBCmc5dljpZi09Abi-_I7oJWJ4",
  authDomain: "react-chat-app-74b0d.firebaseapp.com",
  databaseURL: "https://react-chat-app-74b0d-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-74b0d",
  storageBucket: "react-chat-app-74b0d.appspot.com",
  messagingSenderId: "837227098282",
  appId: "1:837227098282:web:2803c23129cd2fde51e0d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
