import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";

export const hoverShowClass = "hoverShowClass";

export default styled(TableCell)(({ theme }) => ({
  position: "relative",
  [`& > :not(.${hoverShowClass})`]: {
    position: "relative",
    opacity: 1,
    transition: "opacity 0.3s ease"
  },
  [`& > .${hoverShowClass}`]: {
    visibility: "hidden",
    position: "absolute",
    right: theme.spacing(2),
    top: "50%",
    transform: "translateY(-50%)"
  },
  "&:hover": {
    [`& > :not(.${hoverShowClass})`]: {
      opacity: 0.3
    },
    [`& > .${hoverShowClass}`]: {
      visibility: "visible"
    }
  }
}));
