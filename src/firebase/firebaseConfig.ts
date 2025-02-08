// blinderz/src/firebase/firebaseConfig.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAs7AmscyCUXaZfOLQyNYQUlaY9AdzMJAw",
  authDomain: "blinderz-b5253.firebaseapp.com",
  projectId: "blinderz-b5253",
  storageBucket: "blinderz-b5253.firebasestorage.app",
  messagingSenderId: "905978682413",
  appId: "1:905978682413:web:9aec5c35051c71d7b42ca4",
  measurementId: "G-LST3SBCHHR"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
