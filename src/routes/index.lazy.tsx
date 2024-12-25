import { createLazyFileRoute, redirect } from '@tanstack/react-router'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";
import SideMenuItem from '@/components/SideMenuItem';

import { db } from "@/firebase/firestore";

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log(db);
  return <>
    <MainContainer>
      
    </MainContainer>
    <SideMenu>
      <SideMenuItem label="Project" navigations={[
        {
          label: "Home",
          to: "/",
          icon: <HomeRoundedIcon />
        }
      ]} />
    </SideMenu>
  </>
}
