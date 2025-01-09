import { createLazyFileRoute } from "@tanstack/react-router";

import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";
import SideMenuNavigation from "@/components/SidemenuNavigation";

import ContentBox from "@/components/ContentBox";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <>
      <MainContainer>
        <ContentBox>準備中</ContentBox>
      </MainContainer>
      <SideMenu>
        <SideMenuNavigation />
      </SideMenu>
    </>
  );
}
