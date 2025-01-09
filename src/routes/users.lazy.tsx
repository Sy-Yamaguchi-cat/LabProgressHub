import { createLazyFileRoute } from "@tanstack/react-router";

import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";

import ContentBox from "@/components/ContentBox";
import UsersTable from "@/components/UsersTable";
import SideMenuNavigation from "@/components/SidemenuNavigation";
import Typography from "@mui/material/Typography";

import { useAtomValue } from "jotai";
import { authStateAtom } from "@/firebase/authentication";
import SigninAlertContent from "@/components/SigninAlertContent";

export const Route = createLazyFileRoute("/users")({
  component: RouteComponent
});

function RouteComponent() {
  const auth = useAtomValue(authStateAtom);
  return (
    <>
      <MainContainer>
        { 
          auth.isAuthenticated
          ? <ContentBox>
              <Typography variant="h4" gutterBottom>
                Users
              </Typography>
              <UsersTable />
            </ContentBox>
          : <SigninAlertContent />
        }
      </MainContainer>
      <SideMenu>
        <SideMenuNavigation />
      </SideMenu>
    </>
  );
}
