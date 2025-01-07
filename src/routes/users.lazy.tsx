import { createLazyFileRoute } from "@tanstack/react-router";

import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";

import ContentBox from "@/components/ContentBox";
import UsersTable from "@/components/UsersTable";
import SideMenuNavigation from "@/components/SidemenuNavigation";

export const Route = createLazyFileRoute("/users")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <>
      <MainContainer>
        <ContentBox>
          <UsersTable />
        </ContentBox>
      </MainContainer>
      <SideMenu>
        <SideMenuNavigation />
      </SideMenu>
    </>
  );
}
