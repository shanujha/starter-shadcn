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

import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { PropsWithChildren } from 'react'
import NoCampaigns from "./no-campaigns";
import { getNestedValue } from "@/lib/get-nested-value";
import formatByType from "@/lib/format-by-type";
import { ICampaign } from "@/interfaces/campaign.interface";
import JWT_UTILS from "@/utils/jwtutil";

type IGenericTableProps = {
  title?: String;
  subtitle?: String;
  data: ICampaign[];
  headers: any[];
}

const hiddenClass = "hidden sm:table-cell";

const GenericTableList = (props: PropsWithChildren<IGenericTableProps>) => {
  const nav = useNavigate();
  const { title, subtitle, data, headers } = props;

  const navigateToCampaign = async (item: ICampaign) => {
   const token =  await JWT_UTILS.createJWT(item);
   nav('/profile/campaigns?q=' + token)
  }

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
                {headers.map((header) => (
                  <TableHead
                    key={header.name}
                    className={clsx(
                      header.hidden && hiddenClass,
                      header.class ?? {}
                    )}
                  >
                    {header.name}
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
                        <div className="font-medium">
                          {headers[i].key === "title" ? (

                            <Button onClick={() => navigateToCampaign(item)} variant="link" className="p-0 h-0">
                              {getNestedValue(item, headers[i].key)}
                            </Button>
                          ) : (
                              <> {formatByType(getNestedValue(item, headers[i].key), headers[i].type ?? 'default')}</>
                            )}
                        </div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <NoCampaigns />
      )}
    </Card>
  );
};

export default GenericTableList;
