import { ComponentProps } from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { styled } from "@mui/material/styles";
import { drawerWidth } from "./Drawer";

export const StyledMain = styled("main", {
  shouldForwardProp: (propName) => propName !== "open",
})<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
      },
    },
  ],
}));

export type MainProps = ComponentProps<typeof StyledMain>;

export default function Main({ children, ...restProps }: MainProps) {
  return (
    <Box>
      <Toolbar variant="dense" />
      <StyledMain {...restProps}>{children}</StyledMain>
    </Box>
  );
}
