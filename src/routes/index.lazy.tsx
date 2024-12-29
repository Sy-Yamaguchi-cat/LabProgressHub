import { createLazyFileRoute } from "@tanstack/react-router";
import Box from "@mui/material/Box";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";
import SideMenuItem from "@/components/SideMenuItem";

import {
  usersCollectionAtom,
  projetsCollectionAtom,
} from "@/firebase/firestore/firestore";
import { useAtomValue } from "jotai";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const users = useAtomValue(usersCollectionAtom);
  const projects = useAtomValue(projetsCollectionAtom);
  return (
    <>
      <MainContainer>
        <Box>{JSON.stringify(users)}</Box>
        <Box>{JSON.stringify(projects)}</Box>
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
