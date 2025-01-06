import { createLazyFileRoute } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";
import SideMenuItem from "@/components/SideMenuItem";
import ContentBox from "@/components/ContentBox";

import { usersAtom, projectsAtom, projectAtomFamily } from "@/firebase/usecase";
import { useAtomValue } from "jotai";
import { ProgressTableContent } from "@/components/ProgressTableContent";

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
        <SideMenuItem
          label="Project"
          navigations={[
            {
              label: "Home",
              to: "/",
              icon: <HomeRoundedIcon />
            }
          ]}
        />
      </SideMenu>
    </>
  );
}
