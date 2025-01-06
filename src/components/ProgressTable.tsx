import { Project } from "@/domain/project";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export type Props = {
  project: Project;
};
export default function ProgressTable({ project }: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {project.tasks.map((task) => {
              return <TableCell key={task.uid}>{task.contentName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(project.assignedUsers).map((user) => (
            <TableRow key={user.uid}>
              <TableCell component="th" scope="row">
                {user.userName}
              </TableCell>
              {project.tasks.map((task) => {
                return (
                  <TableCell key={task.uid}>
                    {JSON.stringify(task.status[user.uid])}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
