import { createLazyFileRoute } from "@tanstack/react-router";
import Box from "@mui/material/Box";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";
import SideMenuItem from "@/components/SideMenuItem";

import {
  usersCollectionAtom,
  projetsCollectionAtom,
  tasksAtomFamily,
} from "@/firebase/firestore";
import { useAtomValue } from "jotai";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const users = useAtomValue(usersCollectionAtom);
  const projects = useAtomValue(projetsCollectionAtom);
  const project = Object.keys(projects)[0]
  const tasks = useAtomValue(tasksAtomFamily(project))
  
  return (
    <>
      <MainContainer>
        <Box>users</Box>
        <Box>{JSON.stringify(users)}</Box>
        <Box>projects</Box>
        <Box>{JSON.stringify(projects)}</Box>
        <Box>project</Box>
        <Box>{JSON.stringify(project)}</Box>
        <Box>tasks</Box>
        <Box>{JSON.stringify(tasks)}</Box>
      </MainContainer>
      <SideMenu>
        <SideMenuItem
          label="Project"
          navigations={[
            {
              label: "Home",
              to: "/",
              icon: <HomeRoundedIcon />,
            },
          ]}
        />
      </SideMenu>
    </>
  );
}
