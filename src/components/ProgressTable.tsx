import { Project } from "@/domain/project";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export type Props = {
  project: Project;
};
export default function ProgressTable({ project }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {project.tasks.map((task) => {
              return <TableCell component="th" key={task.uid}>
                <Box sx={{display:"flex", alignItems:"center"}}>
                  <Box sx={{flexGrow:1}}>
                    <Typography variant="h6" display="inline" textAlign="end">
                      {task.contentName}
                    </Typography>
                  </Box>
                  <IconButton size="small"><EditIcon fontSize="inherit" /></IconButton>
                </Box>
              </TableCell>;
            })}
            <TableCell>
              <Box sx={{display:"flex", alignItems:"center"}}>
                <IconButton size="small"><AddCircleOutlineIcon fontSize="inherit" /></IconButton>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(project.assignedUsers).map((user) => (
            <TableRow key={user.uid}>
              <TableCell component="th" scope="row">
                <Typography variant="body1" display="inline" textAlign="end">
                  {user.userName}
                </Typography>
              </TableCell>
              {project.tasks.map((task) => {
                return (
                  <TableCell key={task.uid} sx={{position:"relative"}}>
                    <Box sx={{display:"flex", alignItems:"center"}}>
                      <Box sx={{flexGrow:1}}>
                        {JSON.stringify(task.status[user.uid])}
                      </Box>
                    </Box>
                    <IconButton sx={{
                      position:"absolute",
                      right: 0,
                      visibility: "hidden",
                      "&:hover": {
                        visibility: "visible"
                      }
                      }} size="small"><EditIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                );
              })}
              <TableCell></TableCell>
            </TableRow>
          ))}
          <TableRow>
              <TableCell component="th" scope="row">
                <IconButton size="small"><AddCircleOutlineIcon fontSize="inherit" /></IconButton>
              </TableCell>
              {project.tasks.map((task) => {
                return (
                  <TableCell key={task.uid}>
                  </TableCell>
                );
              })}
              <TableCell></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
