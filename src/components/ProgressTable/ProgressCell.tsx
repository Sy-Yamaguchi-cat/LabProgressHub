import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

import EditIcon from "@mui/icons-material/Edit";
import HoverVisTableCell, { hoverShowClass } from "./HoverVisTableCell";
import { MemberInfo, Task } from "@/domain/project";
import { format } from "date-fns";
import { styled } from "@mui/material";

export type Props = {
  task: Task;
  user: MemberInfo;
  editStatus: (taskUid: string, userUid: string) => void;
};
export default function ProgressCell({ task, user, editStatus }: Props) {
  const status = task.status[user.uid];
  const progressCircle = (
    <ContentBox>
      <CircularProgressWithLabel
        variant="determinate"
        value={status?.percentage ?? 0}
      />
    </ContentBox>
  );
  const deadline = status?.deadline && (
    <ContentBox>
      <Typography variant="body2" noWrap>
        Deadline
      </Typography>
      <Typography variant="body1" textAlign="right" noWrap>
        {format(status.deadline, "yyyy-MM-dd")}
      </Typography>
    </ContentBox>
  );
  const text = status?.text && (
    <Box>
      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
        {status.text}
      </Typography>
    </Box>
  );
  return (
    <HoverVisTableCell key={task.uid}>
      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center">
          {progressCircle}
          {deadline}
        </Stack>
        {text}
      </Stack>
      <IconButton
        className={hoverShowClass}
        size="small"
        onClick={() => editStatus(task.uid, user.uid)}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
    </HoverVisTableCell>
  );
}

const ContentBox = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
