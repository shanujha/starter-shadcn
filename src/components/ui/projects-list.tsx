import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, ListFilter } from "lucide-react";

import { IProject } from "@/interfaces/project.interface";
import { CreateProjectDialog } from "./create-project-dialog";
import NoProjects from "./no-projects";
import { saveProject } from "@/api/projects/save-project";
import { useNavigate } from "react-router-dom";

export interface IProjectsView {
  title?: String;
  subtitle?: String;
  projects: IProject[];
}

const ProjectsListViewComponent = (props: IProjectsView) => {
  const nav = useNavigate();
  const { title, subtitle, projects } = props;
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <div className="flex items-center">
        <CardHeader className="px-7">
          <CardTitle className="flex">{title ?? "Items"}</CardTitle>
          <CardDescription>
            {subtitle ?? "The recent items in the list"}
          </CardDescription>
        </CardHeader>
        <div className="ml-auto flex items-center gap-2 mr-7">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                disabled={projects.length === 0}
                size="sm"
                className="h-7 gap-1 text-sm"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Finished
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>In Progress</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem style={{ color: "brown" }}>
                Failed
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            variant="outline"
            disabled={projects.length === 0}
            className="h-7 gap-1 text-sm"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
          <CreateProjectDialog formsubmitHandler={saveProject} />
        </div>
      </div>
      {projects.length > 0 ? (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Title</TableHead>
                <TableHead>Queue</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Created On
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Framework
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <Button
                      onClick={() => nav(`/test/${project.projectId}`)}
                      variant="link"
                      style={{
                        display: "block",
                        padding: 0,
                        margin: 0,
                        height: 22,
                      }}
                    >
                      <div className="font-medium">{project.name}</div>
                    </Button>
                    <div className="text-xs text-muted-foreground md:inline">
                      {project._id}
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <Badge className="text-xs" variant="secondary">
                      Fulfilled
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(project.createdDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {project.framework.replace("-", " ").toUpperCase()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <NoProjects />
      )}
    </Card>
  );
};

export default ProjectsListViewComponent;
