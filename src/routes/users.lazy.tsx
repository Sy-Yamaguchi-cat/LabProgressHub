import { createLazyFileRoute } from "@tanstack/react-router";

import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";

import ContentBox from "@/components/ContentBox";
import UsersTable from "@/components/UsersTable";
import SideMenuNavigation from "@/components/SidemenuNavigation";
import { Typography } from "@mui/material";

export const Route = createLazyFileRoute("/users")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <>
      <MainContainer>
        <ContentBox>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <UsersTable />
        </ContentBox>
      </MainContainer>
      <SideMenu>
        <SideMenuNavigation />
      </SideMenu>
    </>
  );
}
