// src/components/ProjectProgressTable.tsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Paper,
} from "@mui/material";
import { ProjectController } from "@/interface/presenter/project-presenter";
import { ProjectPresenter } from "@/interface/controller/project-controller";
import { Project } from "@/domain/project";

type ProjectProgressTableProps = {
    presenter: ProjectPresenter;
    controller: ProjectController;
};

const ProjectProgressTable: React.FC<ProjectProgressTableProps> = (props: ProjectProgressTableProps) => {
  const [projects, setProjects] = useState<Project[]>([]);


  const projectPresenter: ProjectPresenter = {
    present: (projects: Project[]) => {
      setProjects(projects);
    },
  };

  const {presenter, controller} = props;

  useEffect(() => {
    controller.listProjects();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ユーザー名</TableCell>
            {projects[0]?.tasks.map((task) => (
              <TableCell key={task.uid}>{task.contentName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.flatMap((project) =>
            project.assigned.map((member) => (
              <TableRow key={member.uid}>
                <TableCell>{member.userName}</TableCell>
                {project.tasks.map((task) => {
                  const status = task.status[member.uid];
                  return (
                    <TableCell key={task.uid}>
                      <LinearProgress
                        variant="determinate"
                        value={status?.percentage || 0}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectProgressTable;
