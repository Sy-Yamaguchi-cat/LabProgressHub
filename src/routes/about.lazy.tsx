import { createLazyFileRoute } from "@tanstack/react-router";

import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";
import SideMenuNavigation from "@/components/SidemenuNavigation";
import ContentBox from "@/components/ContentBox";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

import GitHubIcon from "@mui/icons-material/GitHub";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import projectConfig from "!/firebase/firebase-config.json";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const links = [
    {
      icon: <GitHubIcon />,
      label: "Github",
      to: "https://github.com/Sy-Yamaguchi-cat/LabProgressHub",
    },
    {
      icon: <SettingsApplicationsIcon />,
      label: "Firebase",
      to: `https://console.firebase.google.com/project/${projectConfig.projectId}`,
    },
  ];
  return (
    <>
      <MainContainer>
        <ContentBox>
          <Typography variant="h4" gutterBottom>
            LabProgressHub
          </Typography>

          <Typography variant="h5" gutterBottom>
            Links
          </Typography>
          <Box sx={{ margin: 1 }}>
            {links.map(({ icon, label, to }) => (
              <Stack direction="row" alignItems="center" spacing={1}>
                {icon}
                <Typography
                  sx={{ marginRight: 1 }}
                  variant="h6"
                  display="inline"
                >
                  {label}
                </Typography>
                <Link href={to}>{to}</Link>
              </Stack>
            ))}
          </Box>
        </ContentBox>
      </MainContainer>
      <SideMenu>
        <SideMenuNavigation />
      </SideMenu>
    </>
  );
}
