import SideMenuItem from "./SideMenuItem";

import { projetsCollectionAtom } from "@/firebase/firestore/projects";
import { useAtomValue } from "jotai";

export default function ProjectNavigation() {
  const projects = useAtomValue(projetsCollectionAtom);
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
