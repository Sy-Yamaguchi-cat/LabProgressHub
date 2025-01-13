import { useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { DatePicker } from "@mui/x-date-pickers";

import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Project, TaskStatus } from "@/domain/project";
import { editProgress } from "@/firebase/usecase";

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

export type ProgressEditState = {
  statusUid?: string;
  taskUid: string;
  userUid: string;
  progress: Partial<TaskStatus>;
};
export type Props = {
  open: boolean;
  onClose: () => void;
  project: Project;
  state: ProgressEditState;
  onChange: (newState: ProgressEditState) => void;
};
export default function ProgressModal({
  open,
  onClose,
  project,
  state,
  onChange,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const task = project.tasks.find((task) => task.uid == state.taskUid);
  const user = Object.values(project.assignedUsers).find(
    (user) => user.uid == state.userUid,
  );
  const execute = async () => {
    setError(null);
    const projectUid = project.uid;
    const taskUid = state.taskUid;
    const userUid = state.userUid;
    const deadline = state.progress.deadline;
    const percentage = state.progress.percentage;
    const text = state.progress.text;
    const progressUid = state.progress.uid;
    await editProgress({
      projectUid,
      taskUid,
      userUid,
      deadline,
      percentage,
      text,
      progressUid,
    });
    onClose();
    return;
  };
  return (
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
          Project &gt; {project.projectName} &gt; {task?.contentName} &gt;{" "}
          {user?.userName}
        </Typography>
        <Typography variant="h3" gutterBottom>
          Edit the status
        </Typography>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
        <Grid container spacing={3}>
          <FormGrid size={{ xs: 12, md: 12 }}>
            <Typography variant="subtitle1" display="inline">
              Progress{" "}
              <Typography variant="body1" display="inline">
                {state.progress.percentage ?? 0}/100
              </Typography>
            </Typography>
            <Box>
              <Slider
                min={0}
                max={100}
                step={10}
                value={state.progress.percentage ?? 0}
                onChange={(evt, value) => {
                  onChange({
                    ...state,
                    progress: {
                      ...state.progress,
                      percentage: value as number,
                    },
                  });
                }}
              />
            </Box>
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 12 }}>
            <Typography variant="subtitle1" display="inline">
              Deadline
            </Typography>
            <DatePicker
              format="yyyy-MM-dd"
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () =>
                    onChange({
                      ...state,
                      progress: {
                        ...state.progress,
                        deadline: undefined,
                      },
                    }),
                },
                actionBar: {
                  actions: ["clear"],
                },
              }}
              value={state.progress.deadline ?? null}
              onAccept={(newValue) =>
                onChange({
                  ...state,
                  progress: {
                    ...state.progress,
                    deadline: newValue ?? undefined,
                  },
                })
              }
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 12 }}>
            <Typography variant="subtitle1" display="inline">
              Text
            </Typography>
            <TextareaAutosize
              value={state.progress.text ?? ""}
              onChange={(evt) =>
                onChange({
                  ...state,
                  progress: {
                    ...state.progress,
                    text: evt.target.value,
                  },
                })
              }
            />
          </FormGrid>
        </Grid>
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={execute}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ButtonContainer>
      </Card>
    </Modal>
  );
}
