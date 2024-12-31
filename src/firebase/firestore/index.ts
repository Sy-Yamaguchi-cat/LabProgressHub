import { atom } from "jotai";

import { subscribeUsersCollectionAtom } from "./users";
import { subscribeProjetsCollectionAtom } from "./projects";
import { subscribeTasksCollectionAtom } from "./tasks";
import { subscribeProgressCollectionAtom } from "./progress";
import { subscribeAssignedUsersCollectionAtom } from "./assigned-users";

export const subscribeFirebaseDB = atom((get) => {
  get(subscribeUsersCollectionAtom);
  get(subscribeProjetsCollectionAtom);
  get(subscribeTasksCollectionAtom);
  get(subscribeProgressCollectionAtom);
  get(subscribeAssignedUsersCollectionAtom);
});

export { usersCollectionAtom } from "./users";
export { projetsCollectionAtom } from "./projects";
export { tasksAtomFamily } from "./tasks";
export { progressAtomFamily } from "./progress";
export { assignedUsersAtomFamily } from "./assigned-users";
