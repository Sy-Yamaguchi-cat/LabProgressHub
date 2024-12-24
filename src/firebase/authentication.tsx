import React, { useEffect } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./app";

import { AuthenticationState } from "@/domain/authentication";

import { atom, useSetAtom } from "jotai";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  hd: import.meta.env.VITE_SIGNIN_HD,
});

export const auth = getAuth(app);

export const signIn = async () => {
  return signInWithPopup(auth, provider);
};

export const signOut = () => {
  return auth.signOut();
};

export const authState = atom<AuthenticationState>({
    isAuthenticated: false,
});

export type AuthenticationContextProps = {
  children?: React.ReactNode;
};

export function AuthenticationContext(props: AuthenticationContextProps) {
  const setAuthState = useSetAtom(authState);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.displayName && user.email) {
        setAuthState({
          isAuthenticated: true,
          user: {
            userName: user.displayName,
            userEmail: user.email,
            userPhotoUrl: user.photoURL ?? undefined,
            uid: user.uid
          }
        });
      } else {
        setAuthState({
          isAuthenticated: false
        });
      }
    });
    return unsubscribe
  }, [setAuthState]);
  return <>{props.children}</>;
}
