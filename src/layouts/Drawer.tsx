import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses, DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import Toolbar from '@mui/material/Toolbar';

export const drawerWidth = 240;

const StyledDrawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
});


export type DrawerProps = MuiDrawerProps;

export default function Drawer({ children, ...restProps }: DrawerProps) {
    return <StyledDrawer variant="persistent" {...restProps}>
        <Toolbar variant="dense"/>
        {children}
    </StyledDrawer>
}