import { collection, query, where, doc } from "firebase/firestore";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import deepEqual from "fast-deep-equal";

import { db } from "./firestore";
import { firestoreSubscribeAtom } from "./utils";

import { projectsCollectionRef, projetsCollectionAtom } from "./projects";
import { tasksCollectionRef, tasksAtomFamily } from "./tasks";

type Progress = {
  uid: string;
  projectUid: string;
  taskUid: string;
  userUid: string;
  deadline?: string;
  percentage?: number;
  text?: string;
};
export const progressCollectionRef = collection(db, "progress");
export const progressQueryFamily = (key: {
  projectUid: string;
  taskUid: string;
}) =>
  query(
    progressCollectionRef,
    where("project_uid", "==", doc(projectsCollectionRef, key.projectUid)),
    where("task_uid", "==", doc(tasksCollectionRef, key.taskUid)),
  );

export const progressAtomFamily = atomFamily(
  (key: { projectUid: string; taskUid: string }) =>
    atom<Record<string, Progress>>({}),
  deepEqual,
);
const subscribeProgressCollectionAtomFamily = atomFamily(
  (key: { projectUid: string; taskUid: string }) =>
    firestoreSubscribeAtom(
      progressAtomFamily(key),
      progressQueryFamily(key),
      (doc) => {
        const data = doc.data();
        return {
          [doc.id]: {
            uid: doc.id,
            projectUid: data["project_uid"].id,
            taskUid: data["task_uid"].id,
            userUid: data["user_uid"].id,
            deadline: data["deadline"],
            percentage: data["percentage"],
            text: data["text"],
          },
        };
      },
    ),
);

export const subscribeProgressCollectionAtom = atom((get) => {
  const projects = get(projetsCollectionAtom);
  for (const project in projects) {
    const tasks = get(tasksAtomFamily(project));
    for (const task in tasks) {
      get(
        subscribeProgressCollectionAtomFamily({
          projectUid: project,
          taskUid: task,
        }),
      );
    }
  }
});
