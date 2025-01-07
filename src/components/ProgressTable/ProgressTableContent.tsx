import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import ContentBox from "@/components/ContentBox";
import ProgressTable from "@/components/ProgressTable/ProgressTable";

import { useAtomValue } from "jotai";
import { projectAtomFamily } from "@/firebase/store";
import { format } from "date-fns";
import TaskModal, { TaskEditState } from "./TaskModal";
import ProgressModal, { ProgressEditState } from "./ProgressModal";
import UserAssignModal from "./UserAssignModal";
import { Stack } from "@mui/material";
import { Project } from "@/domain/project";

export type Props = {
  projectUid: string;
  editProject: (project: Project) => void;
};
export function ProgressTableContent({ projectUid, editProject }: Props) {
  const project = useAtomValue(projectAtomFamily(projectUid));

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskEditState, setTaskEditState] = useState<TaskEditState>({
    type: "new",
    task: {}
  });

  const editTask = (taskUid: string) => {
    const task = project?.tasks.find((task) => task.uid == taskUid);
    if (task) {
      setTaskEditState({ type: "edit", task });
    } else {
      setTaskEditState({ type: "new", task: {} });
    }
    setIsTaskModalOpen(true);
  };
  const addTask = () => {
    setTaskEditState({ type: "new", task: {} });
    setIsTaskModalOpen(true);
  };

  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progressEditState, setProgressEditState] = useState<ProgressEditState>(
    { progress: {}, userUid: "", taskUid: "", statusUid: "" }
  );

  const editStatus = (taskUid: string, userUid: string) => {
    const task = project?.tasks.find((task) => task.uid == taskUid);
    const status = task?.status?.[userUid];
    if (status) {
      setProgressEditState({
        taskUid,
        userUid,
        progress: status
      });
      setIsProgressModalOpen(true);
    } else {
      setProgressEditState({
        taskUid,
        userUid,
        progress: {}
      });
      setIsProgressModalOpen(true);
    }
  };

  const [isUserAssignModalOpen, setIsUserAssignModalOpen] = useState(false);
  const assignUser = () => setIsUserAssignModalOpen(true);

  const titleComponent = (
    <Stack direction="row">
      <Typography sx={{ flexGrow:1 }} variant="h4">
      {project?.projectName ?? ""}
      </Typography>
      <IconButton
        size="medium"
        sx={{justifySelf: "end"}}
        onClick={() => project && editProject(project)}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
    </Stack>
    
  );
  const subTitleComponents = project && (
    <>
      {project.description && (
        <Typography
          variant="body2"
          sx={{ fontWeight: "light", textAlign: "left" }}
        >
          {project.description}
        </Typography>
      )}
      <Typography
        variant="body2"
        sx={{ fontWeight: "light", textAlign: "left" }}
        gutterBottom
      >
        {format(project.startDate, "yyyy-MM-dd")} ~{" "}
        {format(project.endDate, "yyyy-MM-dd")}
      </Typography>
    </>
  );
  const progressTable = project && (
    <Box>
      <ProgressTable
        project={project}
        editStatus={editStatus}
        editTask={editTask}
        addTask={addTask}
        assignUser={assignUser}
      />
    </Box>
  );

  const modals = project && (
    <>
      <TaskModal
        project={project}
        open={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        state={taskEditState}
        onChange={setTaskEditState}
      />
      <ProgressModal
        project={project}
        open={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        state={progressEditState}
        onChange={setProgressEditState}
      />
      <UserAssignModal
        project={project}
        open={isUserAssignModalOpen}
        onClose={() => setIsUserAssignModalOpen(false)}
      />
    </>
  );

  return (
    <ContentBox key={projectUid} id={projectUid}>
      {titleComponent}
      {subTitleComponents}
      {progressTable}
      {modals}
    </ContentBox>
  );
}
