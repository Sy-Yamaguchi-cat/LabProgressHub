import { createLazyFileRoute } from "@tanstack/react-router";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";
import SideMenuNavigation from "@/components/SidemenuNavigation";
import ProjectNavigation from "@/components/ProjectNavigation";
import SearchConfigController from "@/components/SearchConfigController";
import SigninAlertContent from "@/components/SigninAlertContent";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


import { currentProjectsAtom } from "@/firebase/store";
import { useAtomValue } from "jotai";
import { ProgressTableContent } from "@/components/ProgressTable/ProgressTableContent";
import { useState } from "react";
import ProjectEditModal, { ProjectEditState } from "@/components/ProjectEditModal";
import { authStateAtom } from "@/firebase/authentication";


export const Route = createLazyFileRoute("/")({
  component: RouteComponent
});

function RouteComponent() {
  const projects = useAtomValue(currentProjectsAtom);
  const auth = useAtomValue(authStateAtom);
  
  const [isProjectEditModalOpen, setIsProjectEditModalOpen] = useState(false)
  const [newProjectInfo, setNewProjectInfo] = useState<ProjectEditState>({});
  const editProject = (project: ProjectEditState) => {
    setNewProjectInfo(project);
    setIsProjectEditModalOpen(true);
  }

  const projectAddButton = (
    <Box sx={(theme) => ({margin: theme.spacing(3)})}>
      <Button
        sx={{width:"100%"}}
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => {
          setNewProjectInfo({});
          setIsProjectEditModalOpen(true);
        }}
      >
        Add a new project
      </Button>
    </Box>
  );

  const contents = projects.map(({uid}) => (
    <ProgressTableContent
      key={uid}
      projectUid={uid}
      editProject={editProject}
    />
  ));
  return (
    <>
      <MainContainer>
        {
          auth.isAuthenticated 
            ? <>
              <SearchConfigController />
              {projectAddButton}
              {contents}
            </>
            : <SigninAlertContent />
        }
      </MainContainer>
      <SideMenu>
        <SideMenuNavigation />
        <ProjectNavigation />
      </SideMenu>
      <ProjectEditModal
        open={isProjectEditModalOpen}
        onClose={() => setIsProjectEditModalOpen(false)}
        state={newProjectInfo}
        onChange={setNewProjectInfo}
      />
    </>
  );
}
