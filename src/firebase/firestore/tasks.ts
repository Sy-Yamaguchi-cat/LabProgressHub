import { collection, doc, query, where } from "firebase/firestore";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import { db } from "./firestore";
import { firestoreSubscribeAtom } from "./utils";
import { projetsCollectionAtom, projetsCollectionRef } from "./projects";

type Task = {
  uid: string;
  projectUid: string;
  taskName: string;
  comment: string;
  order: number;
};
export const tasksCollectionRef = collection(db, "tasks");
const tasksQueryFamily = (projectUid: string) =>
  query(
    tasksCollectionRef,
    where("project_uid", "==", doc(projetsCollectionRef, projectUid)),
  );
export const tasksAtomFamily = atomFamily((projectUid: string) =>
  atom<Record<string, Task>>({}),
);
const subscribeTasksCollectionAtomFamily = atomFamily((projectUid: string) =>
  firestoreSubscribeAtom(
    tasksAtomFamily(projectUid),
    tasksQueryFamily(projectUid),
    (doc) => {
      const data = doc.data();
      return {
        [doc.id]: {
          uid: doc.id,
          projectUid: data["project_uid"].id,
          taskName: data["task_name"],
          comment: data["comment"],
          order: data["order"],
        },
      };
    },
  ),
);

export const subscribeTasksCollectionAtom = atom((get) => {
  const projects = get(projetsCollectionAtom);
  for (const project in projects) {
    get(subscribeTasksCollectionAtomFamily(project));
  }
});
