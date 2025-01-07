import { collection, query } from "firebase/firestore";
import { atom } from "jotai";

import { db } from "./firestore";
import { firestoreSubscribeAtom } from "./utils";

type User = {
  uid: string;
  userName: string;
  userEmail: string;
};
export const usersCollectionRef = collection(db, "users");
const usersQuery = query(usersCollectionRef);
export const usersCollectionAtom = atom<Record<string, User>>({});
export const subscribeUsersCollectionAtom = firestoreSubscribeAtom(
  usersCollectionAtom,
  usersQuery,
  (doc) => {
    const data = doc.data();
    return {
      [doc.id]: {
        uid: doc.id,
        userName: data["user_name"],
        userEmail: data["user_email"]
      }
    };
  }
);
