import { Outlet, createRootRoute } from "@tanstack/react-router";
import CssBaseline from "@mui/material/CssBaseline";

import { AuthenticationContext } from "@/firebase/authentication";
import AppNavbar from "@/components/AppNavbar";
import AppTheme from "@/theme/AppTheme";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AuthenticationContext>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppNavbar />
        <Outlet />
      </AppTheme>
    </AuthenticationContext>
  );
}
