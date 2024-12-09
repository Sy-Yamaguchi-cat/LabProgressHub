import { Either } from "fp-ts/es6/Either";

import { MemberInfo, Project, Task, TaskStatus } from "@/domain/project";

export interface CreateProjectUsecase {
  createNewProject(projectName: string): Either<Project, Error>;
}

export interface DeleteProjectUsecase {
  deleteProject(projectUid: Project["uid"]): Either<null, Error>;
}

export interface ProjectAssignMemberUsecase {
  assignMember(
    projectUid: Project["uid"],
    menberUid: MemberInfo["uid"],
  ): Either<null, Error>;
}

export interface ProjectReleaseMemberUsecase {
  releaseMember(
    projectUid: Project["uid"],
    menberUid: MemberInfo["uid"],
  ): Either<null, Error>;
}
