import { Outlet, createRootRoute } from "@tanstack/react-router";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  subscribeAuthentication,
  subscribeFirebaseDB,
} from "@/firebase";
import AppNavbar from "@/components/AppNavbar";
import AppTheme from "@/theme/AppTheme";
import { useAtom } from "jotai";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useAtom(subscribeAuthentication);
  useAtom(subscribeFirebaseDB);
  return (
    <QueryClientProvider client={queryClient}>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppNavbar />
        <Outlet />
      </AppTheme>
    </QueryClientProvider>
  );
}
