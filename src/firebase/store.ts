import { atom } from "jotai";

import {
  usersCollectionAtom,
  projetsCollectionAtom,
  tasksAtomFamily,
  progressAtomFamily,
  assignedUsersAtomFamily,
} from "./firestore";
import { Project, Task, TaskStatus } from "@/domain/project";
import { atomFamily } from "jotai/utils";
import { compareAsc, subMonths } from "date-fns";

export const usersAtom = atom((get) => {
  const users = get(usersCollectionAtom);
  return Object.values(users);
});

export const projectsAtom = atom((get) => {
  const rawProjects = get(projetsCollectionAtom);
  const sortedProjects = Object.values(rawProjects).sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime(),
  );
  return sortedProjects;
});

export const pastMonthAmountAtom = atom<number | null>(1);

export const currentProjectsAtom = atom((get) => {
  const projects = get(projectsAtom);
  const pastMonthAmount = get(pastMonthAmountAtom);
  if (pastMonthAmount == null) {
    return projects;
  }
  const previousMonthDate = subMonths(new Date(), pastMonthAmount);
  return projects.filter(
    ({ endDate }) => compareAsc(endDate, previousMonthDate) >= 0,
  );
});

export const projectAtomFamily = atomFamily((projectUid: string) =>
  atom((get) => {
    const projects = get(projetsCollectionAtom);
    const rawProject = projects[projectUid];
    if (rawProject == undefined) {
      return null;
    }
    const users = get(usersCollectionAtom);
    const rawAssignedUsers = get(assignedUsersAtomFamily(projectUid));
    const assignedUsers = Object.fromEntries(
      Object.values(rawAssignedUsers)
        .map(({ userUid }) => userUid)
        .filter((userUid) => userUid in users)
        .map((userUid) => [userUid, users[userUid]]),
    );
    const rawTasks = get(tasksAtomFamily(projectUid));
    const tasks: Task[] = Object.entries(rawTasks)
      .sort((a, b) => a[1].order - b[1].order)
      .map(([taskUid, rawTask]) => {
        const rawStatus = get(progressAtomFamily({ projectUid, taskUid }));
        const status = Object.fromEntries(
          Object.entries(rawStatus)
            .map(([statusUid, rawStatus]) => {
              const status: TaskStatus = {
                uid: statusUid,
                deadline: rawStatus.deadline
                  ? new Date(rawStatus.deadline)
                  : undefined,
                percentage: rawStatus.percentage,
                text: rawStatus.text,
              };
              return [rawStatus.userUid, status] as const;
            })
            .filter(([userUid]) => userUid in assignedUsers),
        );
        const task: Task = {
          uid: taskUid,
          contentName: rawTask.taskName,
          comment: rawTask.comment,
          status,
        };
        return task;
      });
    const project: Project = {
      uid: projectUid,
      projectName: rawProject.projectName,
      description: rawProject.description,
      startDate: rawProject.startDate,
      endDate: rawProject.endDate,
      assignedUsers: assignedUsers,
      tasks,
    };
    return project;
  }),
);
