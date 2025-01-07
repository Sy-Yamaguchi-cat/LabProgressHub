import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Project } from "@/domain/project";
import { useState } from "react";

import { usersAtom } from "@/firebase/store";
import { useAtomValue } from "jotai";
import { assignUser } from "@/firebase/usecase";

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

export type Props = {
  open: boolean;
  onClose: () => void;
  project: Project;
};
export default function UserAssignModal(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const users = useAtomValue(usersAtom);
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Card
        sx={(theme) => ({
          position: "absolute",
          top: { md: "50%" },
          left: { md: "50%" },
          transform: { md: "translate(-50%, -50%)" },
          padding: theme.spacing(5)
        })}
      >
        <Typography variant="subtitle1" color="textDisabled">
          Project &gt; {props.project.projectName}
        </Typography>
        <Typography variant="h3" gutterBottom>
          Assign user
        </Typography>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
        <TableContainer component={Paper}>
          <Typography variant="subtitle1" color="error">
            {error}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th">
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell component="th">
                  <Typography variant="h6">Email</Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
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
                  <TableCell>
                    <Typography
                      variant="body1"
                      display="inline"
                      textAlign="end"
                      noWrap
                    >
                      {user.userEmail}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {user.uid in props.project.assignedUsers ? (
                      <Button variant="outlined" disabled>
                        Assigned
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          assignUser({
                            projectUid: props.project.uid,
                            userUid: user.uid
                          })
                        }
                      >
                        Assign
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ButtonContainer>
          <Button variant="outlined" color="secondary" onClick={props.onClose}>
            Cancel
          </Button>
        </ButtonContainer>
      </Card>
    </Modal>
  );
}
