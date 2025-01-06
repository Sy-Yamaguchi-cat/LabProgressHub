import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ContentBox from "@/components/ContentBox";
import ProgressTable from "@/components/ProgressTable";

import { useAtomValue } from "jotai";
import { projectAtomFamily } from "@/firebase/usecase";
import { format } from "date-fns";

export type Props = {
  projectUid: string;
};
export function ProgressTableContent({ projectUid }: Props) {
  const project = useAtomValue(projectAtomFamily(projectUid));
  const titleComponent = (
    <Typography variant="h4">{project?.projectName ?? ""}</Typography>
  );
  const subTitleComponents = project && (
    <>
      {project.description == "" && (
        <Typography
          variant="body2"
          sx={{ fontWeight: "light", textAlign: "left" }}
        >
          {project.description}
        </Typography>
      )}
      <Typography
        variant="body2"
        sx={{ fontWeight: "light", textAlign: "left" }}
        gutterBottom
      >
        {format(project.startDate, "yyyy-MM-dd")} ~{" "}
        {format(project.endDate, "yyyy-MM-dd")}
      </Typography>
    </>
  );
  const progressTable = project && (
    <Box>
      <ProgressTable project={project} />
    </Box>
  );
  return (
    <ContentBox key={projectUid}>
      {titleComponent}
      {subTitleComponents}
      {progressTable}
    </ContentBox>
  );
}
