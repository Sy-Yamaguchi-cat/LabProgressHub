import { usersCollectionRef } from "./firestore/users";
import { tasksCollectionRef } from "./firestore/tasks";
import { projectsCollectionRef } from "./firestore/projects";
import {
  progressCollectionRef,
  progressQueryFamily,
} from "./firestore/progress";
import { assignedUsersCollectionRef } from "./firestore/assigned-users";

import {
  doc,
  runTransaction,
  deleteDoc,
  getDoc,
  getDocs,
  DocumentReference,
} from "firebase/firestore";
import { format } from "date-fns";
import { db } from "./firestore/firestore";

type EditProject = {
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectUid?: string;
};
export const editProject = async ({
  projectName,
  description,
  startDate,
  endDate,
  projectUid,
}: EditProject) => {
  console.log("editProject ", {
    projectName,
    description,
    startDate,
    endDate,
    projectUid,
  });
  return runTransaction(db, async (transaction) => {
    const project = {
      project_name: projectName,
      description: description,
      start_date: format(startDate, "yyyy-MM-dd"),
      end_date: format(endDate, "yyyy-MM-dd"),
    };
    const documentRef = projectUid
      ? doc(projectsCollectionRef, projectUid)
      : doc(projectsCollectionRef);
    const document = await transaction.get(documentRef);
    if (document.exists()) {
      transaction.update(documentRef, project);
    } else {
      transaction.set(documentRef, project);
    }
    return documentRef.id;
  });
};

type DeleteProject = {
  projectUid: string;
};
export const deleteProject = async ({ projectUid }: DeleteProject) => {
  console.log("deleteProject ", {
    projectUid,
  });
  return runTransaction(db, async (transaction) => {
    const documentRef = doc(projectsCollectionRef, projectUid);
    const document = await transaction.get(documentRef);
    if (document.exists()) {
      transaction.delete(documentRef);
      return documentRef.id;
    } else {
      return null;
    }
  });
};

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
  order,
}: EditTaskProps) => {
  console.log("editTask ", {
    projectUid,
    taskUid,
    taskName,
    comment,
    order,
  });
  return runTransaction(db, async (transaction) => {
    const task = {
      project_uid: doc(projectsCollectionRef, projectUid),
      task_name: taskName,
      ...(comment && { comment }),
      order,
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

type DeleteTask = {
  projectUid: string;
  taskUid: string;
};
export const deleteTask = async ({ projectUid, taskUid }: DeleteTask) => {
  console.log("deleteTask", { taskUid });
  const documentRef = doc(tasksCollectionRef, taskUid);
  const query = progressQueryFamily({ projectUid, taskUid });
  const childDocuments = await getDocs(query);
  const childDocumentRefs: DocumentReference[] = [];
  childDocuments.forEach((doc) => {
    childDocumentRefs.push(doc.ref);
  });
  for (const childDocumentRef of childDocumentRefs) {
    await deleteDoc(childDocumentRef);
  }
  await deleteDoc(documentRef);
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
      project_uid: doc(projectsCollectionRef, projectUid),
      user_uid: doc(usersCollectionRef, userUid),
    });
    return document.id;
  });
};

type UnAssignUserProps = {
  assignedUsersUid: string;
};
export const unAssignUser = async ({ assignedUsersUid }: UnAssignUserProps) => {
  console.log("unAssignUser", { assignedUsersUid });
  return runTransaction(db, async (transaction) => {
    const documentRef = doc(assignedUsersCollectionRef, assignedUsersUid);
    const document = await transaction.get(documentRef);
    if (document.exists()) {
      transaction.delete(documentRef);
      return document.id;
    }
    return null;
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
  progressUid,
}: EditProgressProps) => {
  console.log("editProgress", {
    projectUid,
    taskUid,
    userUid,
    deadline,
    percentage,
    text,
    progressUid,
  });
  return runTransaction(db, async (transaction) => {
    const progress = {
      project_uid: doc(projectsCollectionRef, projectUid),
      task_uid: doc(tasksCollectionRef, taskUid),
      user_uid: doc(usersCollectionRef, userUid),
      ...(deadline && {
        deadline: format(deadline, "yyyy-MM-dd"),
      }),
      ...(percentage && { percentage }),
      ...(text ? { text } : { text: null }),
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
  userEmail,
}: RegisterUserProps) => {
  console.log(registerUser, {
    userUid,
    userName,
    userEmail,
  });
  return await runTransaction(db, async (transaction) => {
    const user = {
      user_name: userName,
      user_email: userEmail,
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
