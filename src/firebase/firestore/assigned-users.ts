import { collection, doc, query, where } from "firebase/firestore";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import { db } from "./firestore";
import { projetsCollectionRef, projetsCollectionAtom } from "./projects";
import { firestoreSubscribeAtom } from "./utils";

type AssignedUsers = {
  uid: string;
  projectUid: string;
  userUid: string;
};
export const assignedUsersCollectionRef = collection(db, "assigned-users");
const assignedUsersQueryFamily = (projectUid: string) =>
  query(
    assignedUsersCollectionRef,
    where("project_uid", "==", doc(projetsCollectionRef, projectUid))
  );
export const assignedUsersAtomFamily = atomFamily((projectUid: string) =>
  atom<Record<string, AssignedUsers>>({})
);
const subscribeAssignedUsersCollectionAtomFamily = atomFamily(
  (projectUid: string) =>
    firestoreSubscribeAtom(
      assignedUsersAtomFamily(projectUid),
      assignedUsersQueryFamily(projectUid),
      (doc) => {
        const data = doc.data();
        return {
          [doc.id]: {
            uid: doc.id,
            projectUid: data["project_uid"].id,
            userUid: data["user_uid"].id
          }
        };
      }
    )
);

export const subscribeAssignedUsersCollectionAtom = atom((get) => {
  const projects = get(projetsCollectionAtom);
  for (const project in projects) {
    get(subscribeAssignedUsersCollectionAtomFamily(project));
  }
});
