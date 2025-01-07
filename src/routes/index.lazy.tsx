import { createLazyFileRoute } from "@tanstack/react-router";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MainContainer from "@/components/MainContainer";
import SideMenu from "@/components/SideMenu";
import SideMenuNavigation from "@/components/SidemenuNavigation";
import ProjectNavigation from "@/components/ProjectNavigation";


import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


import { projectsAtom } from "@/firebase/store";
import { useAtomValue } from "jotai";
import { ProgressTableContent } from "@/components/ProgressTable/ProgressTableContent";
import { useState } from "react";
import ProjectEditModal, { ProjectEditState } from "@/components/ProjectEditModal";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent
});

function RouteComponent() {
  const projects = useAtomValue(projectsAtom);
  
  const [isProjectEditModalOpen, setIsProjectEditModalOpen] = useState(false)
  const [newProjectInfo, setNewProjectInfo] = useState<ProjectEditState>({});
  const editProject = (project: ProjectEditState) => {
    setNewProjectInfo(project);
    setIsProjectEditModalOpen(true);
  }

  const contents = projects.map((projectUid) => (
    <ProgressTableContent
      key={projectUid}
      projectUid={projectUid}
      editProject={editProject}
    />
  ));
  return (
    <>
      <MainContainer>
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
        {contents}
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
