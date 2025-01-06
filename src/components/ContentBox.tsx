import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(3),
}));