import { collection, query } from "firebase/firestore";
import { atom } from "jotai";

import { db } from "./firestore";
import { firestoreSubscribeAtom } from "./utils";

type Project = {
  uid: string;
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
};
const projetsCollectionRef = collection(db, "projects");
const projectsQuery = query(projetsCollectionRef);
export const projetsCollectionAtom = atom<Record<string, Project>>({});
export const subscribeProjetsCollectionAtom = firestoreSubscribeAtom(
  projetsCollectionAtom,
  projectsQuery,
  (doc) => {
    const data = doc.data();
    return {
      [doc.id]: {
        uid: doc.id,
        projectName: data["project_name"],
        description: data["description"],
        startDate: data["start_date"],
        endDate: data["end_date"],
      },
    };
  }
);
