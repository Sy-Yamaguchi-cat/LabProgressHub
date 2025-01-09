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

import { DatePicker } from "@mui/x-date-pickers";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Project } from "@/domain/project";
import { editProject, deleteProject } from "@/firebase/usecase";
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

export type ProjectEditState = Partial<
  Omit<Project, "tasks" | "assignedUsers">
>;
export type Props = {
  open: boolean;
  onClose: () => void;
  state: ProjectEditState;
  onChange: (newState: ProjectEditState) => void;
};
export default function ProjectEditModal({
  open,
  onClose,
  state,
  onChange,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const title = state.uid ? "Edit the project" : "Create a new project";
  const executeText = state.uid ? "Edit" : "Create";
  const triggerEditProject = async () => {
    setError(null);
    if (!state.projectName) {
      setError("Project name is not filled.");
      return;
    }
    if (state.description == undefined) {
      setError("Description is not filled.");
      return;
    }
    if (state.startDate == undefined) {
      setError("Start date is not filled.");
      return;
    }
    if (state.endDate == undefined) {
      setError("End date is not filled.");
      return;
    }
    await editProject({
      projectName: state.projectName,
      description: state.description,
      startDate: state.startDate,
      endDate: state.endDate,
      projectUid: state.uid,
    });
    onClose();
  };
  const [confirmOpen, setConfirmOpen] = useState(false);
  const triggerDeleteProject = async () => {
    if (!state.uid) {
      setError("Cannot delete a project without a valid UID.");
      return;
    }
    try {
      await deleteProject({ projectUid: state.uid });
      onClose();
    } catch (err) {
      setError("Failed to delete the project. Please try again.");
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
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: 4, marginBottom: 4 }}>
            <FormGrid size={{ xs: 12, md: 12 }}>
              <TextField
                label="Project name"
                value={state.projectName ?? null}
                onChange={(evt) =>
                  onChange({
                    ...state,
                    projectName: evt.target.value,
                  })
                }
                placeholder="ProjectX"
                required
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 12 }}>
              <TextField
                label="Description"
                required
                value={state.description}
                onChange={(evt) =>
                  onChange({
                    ...state,
                    description: evt.target.value,
                  })
                }
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <DatePicker
                label="Start date"
                value={state.startDate ?? null}
                onChange={(newValue) =>
                  onChange({
                    ...state,
                    startDate: newValue ?? undefined,
                  })
                }
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <DatePicker
                label="End date"
                value={state.endDate ?? null}
                onChange={(newValue) =>
                  onChange({
                    ...state,
                    endDate: newValue ?? undefined,
                  })
                }
              />
            </FormGrid>
          </Grid>
          <ButtonContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={triggerEditProject}
            >
              {executeText}
            </Button>
            {state.uid && (
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
            Are you sure you want to delete this project? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await triggerDeleteProject();
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
