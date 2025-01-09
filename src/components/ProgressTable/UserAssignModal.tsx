import { use, useState } from "react";
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
import MuiLink from "@mui/material/Link";

import { Link } from "@tanstack/react-router";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Project } from "@/domain/project";

import { usersAtom } from "@/firebase/store";
import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { assignUser, unAssignUser } from "@/firebase/usecase";
import { authStateAtom } from "@/firebase/authentication";
import { assignedUsersAtomFamily } from "@/firebase/firestore";

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

export type Props = {
  open: boolean;
  onClose: () => void;
  project: Project;
};
export default function UserAssignModal({ open, onClose, project }: Props) {
  const [error, setError] = useState<string | null>(null);
  const users = useAtomValue(usersAtom);
  const triggerUnAssign = useAtomCallback((get, set, userUid: string) => {
    const assignedUsers = get(assignedUsersAtomFamily(project.uid));
    const assignedUser = Object.values(assignedUsers).find(
      ({ userUid: targetUserUid }) => userUid == targetUserUid,
    );
    if (!assignedUser) {
      setError(`User ${userUid} is not assigned to this porject.`);
      return;
    }
    return unAssignUser({ assignedUsersUid: assignedUser.uid });
  });
  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={(theme) => ({
          position: "absolute",
          top: { md: "50%" },
          left: { md: "50%" },
          transform: { md: "translate(-50%, -50%)" },
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "scroll",
          padding: theme.spacing(5),
        })}
      >
        <Typography variant="subtitle1" color="textDisabled">
          Project &gt; {project.projectName}
        </Typography>
        <Typography variant="h3" gutterBottom>
          Assign users
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
                    {user.uid in project.assignedUsers ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => triggerUnAssign(user.uid)}
                      >
                        UnAssign
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          assignUser({
                            projectUid: project.uid,
                            userUid: user.uid,
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
        <Typography variant="body1" color="info" sx={{ marginTop: 2 }}>
          If your name is not listed in the table, you can register yourself on
          the{" "}
          <MuiLink component={Link} color="info" to="./users">
            Users page
          </MuiLink>
          .
        </Typography>
        <ButtonContainer>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ButtonContainer>
      </Card>
    </Modal>
  );
}
