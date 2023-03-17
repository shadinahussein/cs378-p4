// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHuIfeU5f5HhLf2YxSy_evoAETumY32Z8",
  authDomain: "weatherapphci.firebaseapp.com",
  projectId: "weatherapphci",
  storageBucket: "weatherapphci.appspot.com",
  messagingSenderId: "602447482695",
  appId: "1:602447482695:web:337dfc44bc0c1422a94662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // get the auth instance
const db = getDatabase();

export { auth, db };