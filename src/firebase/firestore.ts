import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { app } from "./app";
import { authState } from "./authentication";
import { atom } from "jotai";

export const db = getFirestore(app);

const usersCollectionRef = collection(db, "users");

const projetsCollectionRef = collection(db, "projets");

const tasksCollectionRef = collection(db, "tasks");

const AssignedUsersCollectionRef = collection(db, "assigned-users");

const progressCollectionRef = collection(db, "progress");

export const isCurrentOnlyfetchAtom = atom(true);

export const usersCollectionAtom = atom(async (get) => {
  const auth = get(authState);
  if (!auth.isAuthenticated) {
    return new Promise((resolve, reject) => reject());
  }
  const isCurrentOnlyfetch = get(isCurrentOnlyfetchAtom);
  query(usersCollectionRef, where("period", ">", Date()), orderBy("period"));
});
