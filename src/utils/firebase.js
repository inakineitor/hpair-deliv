// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import StyledFirebaseAuth from '../components/StyledFirebaseAuth.tsx';

// google sign in
import { GoogleAuthProvider } from 'firebase/auth';

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

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Github as auth providers.
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore();

// Export FirebaseUI signin screen
export function SignInScreen() {
  return (
    <div>
      <h1>Sign in to Links for Climate Good</h1>
      <p>Please sign-in with your Googe account:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
