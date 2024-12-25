import { MemberInfo, Project, Task, TaskStatus } from "@/domain/project";
import { Either } from "fp-ts/es6/Either";

export class MemberRepository {
  list(): Either<string[], Error> {}
  create(
    menberUid: string,
    userName: string,
    userEmail: string,
  ): Either<MemberInfo, Error>;
  read(menberUid: string): Either<MemberInfo, Error>;
  update(
    menberUid: string,
    userName: string,
    userEmail: string,
  ): Either<MemberInfo, Error>;
  delete(menberUid: string): Either<null, Error>;
}

export interface IProjectRepository {
  list(): Either<Project["uid"][], Error>;
  create(projectName: string): Either<Project, Error>;
  read(projectUid: Project["uid"]): Either<Project, Error>;
  update(
    projectUid: Project["uid"],
    projectName: string,
  ): Either<MemberInfo, Error>;
  delete(projectUid: Project["uid"]): Either<null, Error>;

  assign(
    projectUid: Project["uid"],
    menberUid: MemberInfo["uid"],
  ): Either<null, Error>;
  release(
    projectUid: Project["uid"],
    menberUid: MemberInfo["uid"],
  ): Either<null, Error>;

  createTask(
    projectUid: Project["uid"],
    contentName: string,
  ): Either<Task, Error>;
  updateTask(
    projectUid: Project["uid"],
    taskUid: Task["uid"],
    contentName: string,
  ): Either<Task, Error>;
  deleteTask(
    projectUid: Project["uid"],
    taskUid: Task["uid"],
  ): Either<null, Error>;

  updateTaskStatus(
    projectUid: Project["uid"],
    taskUid: Task["uid"],
    menberUid: MemberInfo["uid"],
    taskStatus: TaskStatus,
  ): Either<null, Error>;
}
