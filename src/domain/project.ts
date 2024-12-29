export type MemberInfo = {
  uid: string;
  userEmail: string;
  userName: string;
};

export type MemberInfoDict = Record<MemberInfo["uid"], MemberInfo>;

export type Project = {
  uid: string;
  projectName: string;
  tasks: Task[];
  assigned: MemberInfo[];
};

export type Task = {
  uid: string;
  contentName: string;
  status: Record<MemberInfo["uid"], TaskStatus>;
};

export type TaskStatus = {
  uid: string;
  done: boolean;
  deadline?: Date;
  percentage?: number;
  text?: string;
};
