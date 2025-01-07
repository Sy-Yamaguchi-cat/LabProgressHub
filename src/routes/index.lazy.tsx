import { createLazyFileRoute } from "@tanstack/react-router";

import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";
import SideMenuNavigation from "@/components/SidemenuNavigation";

import { projectsAtom } from "@/firebase/store";
import { useAtomValue } from "jotai";
import { ProgressTableContent } from "@/components/ProgressTable/ProgressTableContent";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent
});

function RouteComponent() {
  const projects = useAtomValue(projectsAtom);
  const contents = projects.map((projectUid) => (
    <ProgressTableContent key={projectUid} projectUid={projectUid} />
  ));
  return (
    <>
      <MainContainer>{contents}</MainContainer>
      <SideMenu>
        <SideMenuNavigation />
      </SideMenu>
    </>
  );
}
