import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import HoverVisTableCell, { hoverShowClass } from "./HoverVisTableCell";
import { Task } from "@/domain/project";

export type Props = {
  task: Task;
  editTask: (taskUid: string) => void;
};
export default function TaskTitleCell({ task, editTask }: Props) {
  return (
    <HoverVisTableCell component="th" key={task.uid} sx={{ minWidth: 250 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" display="inline" textAlign="end" noWrap>
            {task.contentName}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textDisabled"
            display="inline"
            textAlign="end"
            sx={(theme) => ({
              marginLeft: theme.spacing(1)
            })}
          >
            {task.comment}
          </Typography>
        </Box>
      </Box>
      <IconButton
        className={hoverShowClass}
        size="small"
        onClick={() => editTask(task.uid)}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
    </HoverVisTableCell>
  );
}
