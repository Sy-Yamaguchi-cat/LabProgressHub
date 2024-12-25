import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import AppBar from '@/layouts/AppBar';


import { useAtomValue, useSetAtom } from 'jotai';
import { signIn, signOut, authState } from '@/firebase/authentication';
import { isSideMenuOpen } from '@/states/layout';


export default function AppNavbar() {
  const authentication = useAtomValue(authState);
  const toggleSidebar = useSetAtom(isSideMenuOpen);
  return (
    <AppBar
      position="fixed"
    >
      <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={()=>toggleSidebar((value:boolean) => !value)}
      >
          <MenuRoundedIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LabProgressHub
      </Typography>
      
      
      {
      authentication.isAuthenticated
        ? <>
              <Box sx={{ margin: 1}}>
                <Avatar
                  alt={authentication.user.userName}
                  src={authentication.user.userPhotoUrl}
                  sx={{ width: 24, height: 24 }}
                />
              </Box>
              <IconButton
                size="small"
                color="error"
                onClick={signOut}
              >
                <LogoutIcon />
              </IconButton>
          </>
        : <IconButton
            size="small"
            color="inherit"
            onClick={signIn}
          >
            <AccountCircle />
          </IconButton>
      }
      
    </AppBar>
  );
}

