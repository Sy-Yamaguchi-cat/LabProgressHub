import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./app";

import { AuthenticationState } from "@/domain/authentication";

import { atom } from "jotai";
import { atomEffect } from "jotai-effect";

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

export const authStateAtom = atom<AuthenticationState>({
  isAuthenticated: false,
});
export const subscribeAuthentication = atomEffect((_, set) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user && user.displayName && user.email) {
      set(authStateAtom, {
        isAuthenticated: true,
        user: {
          userName: user.displayName,
          userEmail: user.email,
          userPhotoUrl: user.photoURL ?? undefined,
          uid: user.uid,
        },
      });
    } else {
      set(authStateAtom, {
        isAuthenticated: false,
      });
    }
  });
  return unsubscribe;
});
