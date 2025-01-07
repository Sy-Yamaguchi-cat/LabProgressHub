import SideMenuItem from "./SideMenuItem";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";

export default function SideMenuNavigation() {
  return (
    <SideMenuItem
      label="Project"
      navigations={[
        {
          label: "Home",
          to: "/",
          icon: <HomeRoundedIcon />
        },
        {
          label: "Users",
          to: "/users",
          icon: <PersonIcon />
        },
        {
          label: "About",
          to: "/about",
          icon: <InfoIcon />
        }
      ]}
    />
  );
}
