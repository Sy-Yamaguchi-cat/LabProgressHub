import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { usersAtom } from "@/firebase/store";
import { useAtomValue } from "jotai";
import { registerUser } from "@/firebase/usecase";
import { authStateAtom } from "@/firebase/authentication";

export default function UsersTable() {
  const [error, setError] = useState<null | string>(null);
  const users = useAtomValue(usersAtom);
  const auth = useAtomValue(authStateAtom);
  const registerYourself = () => {
    if (!auth.isAuthenticated) {
      setError("Not authenticated.");
      return;
    }
    return registerUser({
      userUid: auth.user.userEmail,
      userName: auth.user.userName,
      userEmail: auth.user.userEmail
    });
  };
  return (
    <>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" spacing={2} sx={{margin: 1}}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon fontSize="inherit" />}
          onClick={registerYourself}
        >
          Register Yourself
        </Button>
      </Stack>
    </>
  );
}
