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
import { BookOpen, File, Link2Icon, Link2Off, ListFilter, PlayCircle } from "lucide-react";

import { ITemplate } from "@/interfaces/template.interface";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoTemplateUiHandler from "./no-templates";
import { getNestedValue } from "@/lib/get-nested-value";
import { formatDateString } from "@/lib/date-string";
import { timeAgo } from "@/lib/time-age";
import NoRunsUiHandler from "./no-runs";
import { Drop } from "../blocks/drop";
import { PlayCircleFilled } from "@mui/icons-material";

type header = {
  name: string;
  hidden?: boolean;
  class?: string;
  linkToPart?: string;
  key: string;
  type?: string;
};

type IGenericTableProps = {
  title?: String;
  subtitle?: String;
  data: ITemplate[];
  headers: header[];
  noDataClick: Function;
};

const hiddenClass = "hidden sm:table-cell";

const CampaignUserTable = (props: PropsWithChildren<IGenericTableProps>) => {
  const nav = useNavigate();
  const { title, subtitle, data, headers } = props;
  
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
                disabled={data.length === 0}
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
            disabled={data.length === 0}
            className="h-7 gap-1 text-sm"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
          {props.children}
        </div>
      </div>
      {data.length > 0 ? (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((head) => (
                  <TableHead
                    key={head.name}
                    className={clsx(
                      head.hidden && hiddenClass,
                      head.class ?? {}
                    )}
                  >
                    {head.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>

                  {headers.map((_h, i) => {
                    return (
                      <TableCell
                        key={Math.ceil(Math.random() * 9999999999)}
                        className={clsx(
                          headers[i].hidden && hiddenClass,
                          headers[i].class ?? {}
                        )}
                      >
                        <div className="font-medium p-0 h-0 m-0">
                          {headers[i].key === "runId" ? (
                            <Link to={`/run/${getNestedValue(item, headers[i].key)}`}>

                              <Button variant="link" className="p-0 h-0 m-0 font-bold">
                                <PlayCircle size={16} /> &nbsp;&nbsp; {getNestedValue(item, headers[i].key).substring(0, 8)}
                              </Button>
                            </Link>
                          ) : headers[i].key === "template.title" ? (
                              <Link target="_blank" to={`${headers[i].linkToPart!.split(':')[0]}${getNestedValue(item, headers[i].linkToPart!.split(':')[1])}`}>
                                <Button variant="link" className="p-0 h-0 m-0 font-semibold">
                                  {getNestedValue(item, headers[i].key)}
                                  ⮺
                                </Button>
                              </Link>
                          ) : (
                            <div className="p-0 h-0 m-0"> {formatByType(getNestedValue(item, headers[i].key), headers[i].type ?? 'default')}</div>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              <div className="h-100"></div>
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <NoRunsUiHandler run={props.noDataClick} />
      )}
    </Card>
  );
};

export default CampaignUserTable;


function formatByType(item: string, type: string) {
  switch (type) {
    case "date":
      return formatDateString(item);
    case "elapsed":
      return timeAgo(item);
    default:
      return item;
  }
}
