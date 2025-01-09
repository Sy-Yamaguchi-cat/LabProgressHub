import SideMenuItem from "./SideMenuItem";

import { currentProjectsAtom } from "@/firebase/store";
import { useAtomValue } from "jotai";

export default function ProjectNavigation() {
  const projects = useAtomValue(currentProjectsAtom);
  return (
    <SideMenuItem
      label="Project"
      navigations={Object.values(projects).map((project) => ({
        label: project.projectName,
        to: `/#${project.uid}`,
        dense: true
      }))}
    />
  );
}
