import { styled } from "@mui/material/styles";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export type AppBarProps = MuiAppBarProps;

export default function AppBar({ children, ...restProps }: AppBarProps) {
  return (
    <StyledAppBar position="fixed" {...restProps}>
      <Toolbar variant="dense">{children}</Toolbar>
    </StyledAppBar>
  );
}
