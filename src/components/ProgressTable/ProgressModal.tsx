import { useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Project, TaskStatus } from "@/domain/project";
import { format } from "date-fns";
import { editProgress } from "@/firebase/usecase";

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
export default function ProgressModal(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const task = props.project.tasks.find(
    (task) => task.uid == props.state.taskUid
  );
  const user = Object.values(props.project.assignedUsers).find(
    (user) => user.uid == props.state.userUid
  );
  const execute = async () => {
    setError(null);
    const projectUid = props.project.uid;
    const taskUid = props.state.taskUid;
    const userUid = props.state.userUid;
    const deadline = props.state.progress.deadline;
    const percentage = props.state.progress.percentage;
    const text = props.state.progress.text;
    const progressUid = props.state.progress.uid;
    await editProgress({
      projectUid,
      taskUid,
      userUid,
      deadline,
      percentage,
      text,
      progressUid
    });
    props.onClose();
    return;
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
          Project &gt; {props.project.projectName} &gt; {task?.contentName} &gt;{" "}
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
                {props.state.progress.percentage ?? 0}/100
              </Typography>
            </Typography>
            <Box>
              <Slider
                min={0}
                max={100}
                step={10}
                value={props.state.progress.percentage ?? 0}
                onChange={(evt, value) => {
                  props.onChange({
                    ...props.state,
                    progress: {
                      ...props.state.progress,
                      percentage: value as number
                    }
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
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () =>
                    props.onChange({
                      ...props.state,
                      progress: {
                        ...props.state.progress,
                        deadline: undefined
                      }
                    })
                }
              }}
              value={props.state.progress.deadline ?? null}
              onChange={(newValue) =>
                props.onChange({
                  ...props.state,
                  progress: {
                    ...props.state.progress,
                    ...(newValue && { deadline: newValue })
                  }
                })
              }
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 12 }}>
            <Typography variant="subtitle1" display="inline">
              Text
            </Typography>
            <TextareaAutosize
              value={props.state.progress.text}
              onChange={(evt) =>
                props.onChange({
                  ...props.state,
                  progress: {
                    ...props.state.progress,
                    text: evt.target.value
                  }
                })
              }
            />
          </FormGrid>
        </Grid>
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={execute}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={props.onClose}>
            Cancel
          </Button>
        </ButtonContainer>
      </Card>
    </Modal>
  );
}
