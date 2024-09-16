import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

type IGenericNoDataHandlerProps = {
  title: string;
  description: string;
  hideButton?: boolean;
  buttonTitle?: string;
  buttonIcon?: React.ReactElement;
  buttonHandler: Function;
};



const NoDataUiHandler = (props: PropsWithChildren<IGenericNoDataHandlerProps>) => {

  const handler = (e: any) => {
    props.buttonHandler(e);
  }

  return (
    <div
      className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"
      style={{ height: "500px" }}
    >
      <div
        className="flex flex-1 items-center justify-center rounded-lg"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">{props.title}</h3>
          <p className="text-sm text-muted-foreground">{props.description}</p>
          {!props.hideButton && (
            <Button onClick={handler} className="mt-4">
                {props.buttonIcon && props.buttonIcon}
                {props.buttonTitle}</Button>
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default NoDataUiHandler;
