// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// import { getAnalytics } from "firebase/analytics";
// import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiSxoQBpAZ-ZoYtMsBr5GgCARIbQQabVM",
  authDomain: "stackoverflow-clone-bb94a.firebaseapp.com",
  projectId: "stackoverflow-clone-bb94a",
  storageBucket: "stackoverflow-clone-bb94a.appspot.com",
  messagingSenderId: "699933315867",
  appId: "1:699933315867:web:1c4b784c382c60a88639be",
  measurementId: "G-VT1KR21BGR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = firebase.storage();
// const analytics = getAnalytics(app);