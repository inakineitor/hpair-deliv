// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';

// ! DO NOT CHANGE THIS FILE.

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDWNlIabJEAi2WjNw1yv1p1kfEc1rA8rRc',
  authDomain: 'hpair-deliv-20ae5.firebaseapp.com',
  projectId: 'hpair-deliv-20ae5',
  storageBucket: 'hpair-deliv-20ae5.appspot.com',
  messagingSenderId: '512355825431',
  appId: '1:512355825431:web:4c68852e7be40b7f56e952',
  measurementId: 'G-838GGW845J',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore();

export default firebase;