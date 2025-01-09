import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Project, Task } from "@/domain/project";
import { deleteTask, editTask } from "@/firebase/usecase";
import { useState } from "react";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));
const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  marginTop: theme.spacing(3),
  gap: theme.spacing(2),
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
export default function TaskModal({
  open,
  onClose,
  project,
  state,
  onChange,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const titles: Record<Props["state"]["type"], string> = {
    new: "Create a new task",
    edit: "Edit the task",
  };
  const executeTexts: Record<Props["state"]["type"], string> = {
    new: "Create",
    edit: "Edit",
  };

  const execute = async () => {
    setError(null);
    const projectUid = project.uid;
    const editState = state;
    const taskName = editState.task.contentName;
    const comment = editState.task.comment;
    const taskUid = editState.task.uid;
    const order = project.tasks.find((task) => task.uid == taskUid)
      ? project.tasks.findIndex((task) => task.uid == taskUid)
      : project.tasks.length;
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
        order,
      });
    } else {
      await editTask({
        projectUid,
        taskUid,
        taskName,
        comment,
        order,
      });
    }
    onClose();
  };
  const [confirmOpen, setConfirmOpen] = useState(false);
  const triggerDeleteTask = async () => {
    if (state.type == "new" || state.task.uid == undefined) {
      setError("Cannot delete a task without a valid UID.");
      return;
    }
    try {
      await deleteTask({ projectUid: project.uid, taskUid: state.task.uid });
      onClose();
    } catch (err) {
      setError("Failed to delete the task. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Card
          sx={(theme) => ({
            position: "absolute",
            top: { md: "50%" },
            left: { md: "50%" },
            transform: { md: "translate(-50%, -50%)" },
            width: { md: "50%" },
            maxHeight: "100%",
            maxWidth: "100%",
            overflow: "scroll",
            padding: theme.spacing(5),
          })}
        >
          <Typography variant="subtitle1" color="textDisabled">
            Project &gt; {project.projectName}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {titles[state.type]}
          </Typography>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: 4, marginBottom: 4 }}>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Task name"
                value={state.task.contentName}
                onChange={(evt) =>
                  onChange({
                    ...state,
                    task: {
                      ...state.task,
                      contentName: evt.target.value ?? "",
                    },
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
                value={state.task.comment}
                onChange={(evt) =>
                  onChange({
                    ...state,
                    task: {
                      ...state.task,
                      comment: evt.target.value ?? "",
                    },
                  })
                }
              />
            </FormGrid>
          </Grid>
          <ButtonContainer>
            <Button variant="contained" color="primary" onClick={execute}>
              {executeTexts[state.type]}
            </Button>
            {state.type == "edit" && state.task.uid != undefined && (
              <Button
                variant="contained"
                color="error"
                onClick={() => setConfirmOpen(true)}
              >
                Delete
              </Button>
            )}
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </ButtonContainer>
        </Card>
      </Modal>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this taks? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await triggerDeleteTask();
              setConfirmOpen(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
