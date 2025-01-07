import { atom } from "jotai";

import { usersCollectionRef } from "./firestore/users";
import { tasksCollectionRef, Task as TaskDB } from "./firestore/tasks";
import { projetsCollectionRef } from "./firestore/projects";
import { progressCollectionRef } from "./firestore/progress";
import { assignedUsersCollectionRef } from "./firestore/assigned-users";

import { doc, runTransaction } from "firebase/firestore";
import { format } from "date-fns";
import { db } from "./firestore/firestore";

type EditTaskProps = {
  projectUid: string;
  taskUid?: string;
  taskName: string;
  comment?: string;
  order: number;
};
export const editTask = async ({
  projectUid,
  taskUid,
  taskName,
  comment,
  order
}: EditTaskProps) => {
  console.log("editTask ", {
    projectUid,
    taskUid,
    taskName,
    comment,
    order
  });
  return runTransaction(db, async (transaction) => {
    const task = {
      project_uid: doc(projetsCollectionRef, projectUid),
      task_name: taskName,
      ...(comment && { comment }),
      order
    };
    const documentRef =
      taskUid != undefined
        ? doc(tasksCollectionRef, taskUid)
        : doc(tasksCollectionRef);
    const document = await transaction.get(documentRef);
    if (document.exists()) {
      transaction.update(documentRef, task);
      return document.id;
    } else {
      transaction.set(documentRef, task);
      return document.id;
    }
  });
};

type AssignUserProps = {
  projectUid: string;
  userUid: string;
};
export const assignUser = async ({ projectUid, userUid }: AssignUserProps) => {
  console.log("assignUser", { projectUid, userUid });
  return runTransaction(db, async (transaction) => {
    const document = doc(assignedUsersCollectionRef);
    transaction.set(document, {
      project_uid: doc(projetsCollectionRef, projectUid),
      user_uid: doc(usersCollectionRef, userUid)
    });
    return document.id;
  });
};

type EditProgressProps = {
  projectUid: string;
  taskUid: string;
  userUid: string;
  deadline?: Date;
  percentage?: number;
  text?: string;
  progressUid?: string;
};
export const editProgress = async ({
  projectUid,
  taskUid,
  userUid,
  deadline,
  percentage,
  text,
  progressUid
}: EditProgressProps) => {
  console.log("editProgress", {
    projectUid,
    taskUid,
    userUid,
    deadline,
    percentage,
    text,
    progressUid
  });
  return runTransaction(db, async (transaction) => {
    const progress = {
      project_uid: doc(projetsCollectionRef, projectUid),
      task_uid: doc(tasksCollectionRef, taskUid),
      user_uid: doc(usersCollectionRef, userUid),
      ...(deadline && {
        deadline: format(deadline, "yyyy-MM-dd")
      }),
      ...(percentage && { percentage }),
      ...(text ? { text } : { text: null })
    };

    const documentRef = progressUid
      ? doc(progressCollectionRef, progressUid)
      : doc(progressCollectionRef);
    const document = await transaction.get(documentRef);

    if (document.exists()) {
      transaction.update(documentRef, progress);
    } else {
      transaction.set(documentRef, progress);
    }
    return documentRef.id;
  });
};

type RegisterUserProps = {
  userUid: string;
  userName: string;
  userEmail: string;
};
export const registerUser = async ({
  userUid,
  userName,
  userEmail
}: RegisterUserProps) => {
  console.log(registerUser, {
    userUid,
    userName,
    userEmail
  });
  return await runTransaction(db, async (transaction) => {
    const user = {
      user_name: userName,
      user_email: userEmail
    };
    const documentRef = doc(usersCollectionRef, userUid);
    const document = await transaction.get(documentRef);
    if (document.exists()) {
      transaction.update(documentRef, user);
    } else {
      transaction.set(documentRef, user);
    }
    return document.id;
  });
};
