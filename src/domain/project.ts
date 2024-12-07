type MemberInfo = {
  uid: string;
  userEmail: string;
  userName: string;
};

type Project = {
  uid: string;
  projectName: string;
  tasks: Task[];
  assigned: MemberInfo[];
};

type Task = {
  uid: string;
  contentName: string;
  status: Record<MemberInfo["uid"], TaskStatus>;
};

type TaskStatus = {
  uid: string;
  done: boolean;
  deadline?: Date;
  percentage?: number;
  text?: string;
};
