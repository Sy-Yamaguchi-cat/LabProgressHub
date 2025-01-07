import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Project, Task } from "@/domain/project";
import { editTask } from "@/firebase/usecase";
import { useState } from "react";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column"
}));
const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  marginTop: theme.spacing(3),
  gap: theme.spacing(2)
}));

export type TaskEditState =
  | {
      type: "new";
      task: Partial<Task>;
    }
  | {
      type: "edit";
      task: Partial<Task>;
    };
export type Props = {
  open: boolean;
  onClose: () => void;
  project: Project;
  state: TaskEditState;
  onChange: (newState: TaskEditState) => void;
};
export default function TaskModal(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const titles: Record<Props["state"]["type"], string> = {
    new: "Create a new task",
    edit: "Edit the task"
  };
  const executeTexts: Record<Props["state"]["type"], string> = {
    new: "Create",
    edit: "Edit"
  };

  const execute = async () => {
    setError(null);
    const projectUid = props.project.uid;
    const editState = props.state;
    const taskName = editState.task.contentName;
    const comment = editState.task.comment;
    const taskUid = editState.task.uid;
    const order = props.project.tasks.find((task) => task.uid == taskUid)
      ? props.project.tasks.findIndex((task) => task.uid == taskUid)
      : props.project.tasks.length;
    if (!taskName) {
      setError("Task name is not filled.");
      return;
    }
    if (editState.type == "edit") {
      if (taskUid == undefined) {
        setError("Unexpected error occured!");
        return;
      }
      await editTask({
        projectUid,
        taskUid,
        taskName,
        comment,
        order
      });
    } else {
      await editTask({
        projectUid,
        taskUid,
        taskName,
        comment,
        order
      });
    }
    props.onClose();
  };
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Card
        sx={(theme) => ({
          position: "absolute",
          top: { md: "50%" },
          left: { md: "50%" },
          transform: { md: "translate(-50%, -50%)" },
          width: { md: "50%" },
          padding: theme.spacing(5)
        })}
      >
        <Typography variant="subtitle1" color="textDisabled">
          Project &gt; {props.project.projectName}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {titles[props.state.type]}
        </Typography>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: 4, marginBottom: 4 }}>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Task name"
              value={props.state.task.contentName}
              onChange={(evt) =>
                props.onChange({
                  ...props.state,
                  task: {
                    ...props.state.task,
                    contentName: evt.target.value ?? ""
                  }
                })
              }
              placeholder="Chapter1"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <TextField
              size="small"
              label="Comment"
              value={props.state.task.comment}
              onChange={(evt) =>
                props.onChange({
                  ...props.state,
                  task: {
                    ...props.state.task,
                    comment: evt.target.value ?? ""
                  }
                })
              }
            />
          </FormGrid>
        </Grid>
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={execute}>
            {executeTexts[props.state.type]}
          </Button>
          <Button variant="outlined" color="secondary" onClick={props.onClose}>
            Cancel
          </Button>
        </ButtonContainer>
      </Card>
    </Modal>
  );
}
