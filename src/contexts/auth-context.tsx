import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';

import firebase from 'firebase/compat/app';

export type AuthContextType = {
  isSignedIn: boolean;
  user?: firebase.User;
};

export const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  user: undefined,
});

export function AuthContextProvider({ children }: PropsWithChildren<{}>) {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [user, setUser] = useState<firebase.User>(); // Local user info

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        if (!!user) {
          setUser(user);
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
