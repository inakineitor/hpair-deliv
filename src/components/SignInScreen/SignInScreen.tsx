// google sign in
import { GoogleAuthProvider } from 'firebase/auth';

import { StyledFirebaseAuth } from './StyledFirebaseAuth.tsx';

import firebase from '../../utils/firebase.ts';

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
