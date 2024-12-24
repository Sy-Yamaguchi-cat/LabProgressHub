import * as React from 'react';
import { styled, SxProps, Theme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

type Props = {
  children? : React.ReactNode,
  className?: string;
  sx?: SxProps<Theme>;
}

export default function SideMenu(props: Props) {
  return (
    <Drawer
      variant="permanent"
      className={props.className}
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: 'background.paper',
        },
        ...props.sx
      }}
    >
      {props.children}
      
      <Divider />
    </Drawer>
  );
}
