import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Box, Divider, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from "@mui/material/Toolbar"

import { AuthenticationContext } from '@/firebase/authentication';
import AppNavbar from '@/components/AppNavbar';
import AppTheme from "@/theme/AppTheme"
import SideMenu from "@/components/SideMenu";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthenticationContext>
      <AppTheme>
          <CssBaseline enableColorScheme />
          <AppNavbar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} />
          <SideMenu >
            <Toolbar variant="dense"/>
            <Box>
              aaaa
            </Box>
            <Divider />
            <Box>
              aaaa
            </Box>
          </SideMenu>
          <Outlet />
          <Box 
              component="main"
              sx={{
                  flexGrow: 1,
                  overflow: "auto"
              }}
          >
          </Box>
      </AppTheme>
    </AuthenticationContext>
  )
}
