// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCFgVwIs6j60hRpGUe8OZiehlYY_NrQnAs",
  authDomain: "binvision-5aa5d.firebaseapp.com",
  databaseURL: "https://binvision-5aa5d-default-rtdb.firebaseio.com",
  projectId: "binvision-5aa5d",
  storageBucket: "binvision-5aa5d.appspot.com",
  messagingSenderId: "168045887690",
  appId: "1:168045887690:web:f76f14dc7dde3172837433",
  measurementId: "G-6F84Z0ECTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };