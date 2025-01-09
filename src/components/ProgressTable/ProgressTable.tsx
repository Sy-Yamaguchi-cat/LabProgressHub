import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import TaskTitleCell from "./TaskTitleCell";
import ProgressCell from "./ProgressCell";

import { Project } from "@/domain/project";

export type Props = {
  project: Project;
  editStatus: (taskUid: string, userUid: string) => void;
  editTask: (taskUid: string) => void;
  addTask: () => void;
  assignUser: () => void;
};
export default function ProgressTable({
  project,
  addTask,
  assignUser,
  editStatus,
  editTask,
}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {project.tasks.map((task) => {
              return (
                <TaskTitleCell key={task.uid} task={task} editTask={editTask} />
              );
            })}
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={addTask} size="small">
                  <AddCircleOutlineIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(project.assignedUsers).map((user) => (
            <TableRow key={user.uid}>
              <TableCell component="th" scope="row">
                <Typography
                  variant="body1"
                  display="inline"
                  textAlign="end"
                  noWrap
                >
                  {user.userName}
                </Typography>
              </TableCell>
              {project.tasks.map((task) => (
                <ProgressCell
                  key={task.uid}
                  task={task}
                  user={user}
                  editStatus={editStatus}
                />
              ))}
              <TableCell />
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row">
              <IconButton onClick={assignUser}>
                <PersonAddAltIcon />
              </IconButton>
            </TableCell>
            {project.tasks.map((task) => {
              return <TableCell key={task.uid} />;
            })}
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
