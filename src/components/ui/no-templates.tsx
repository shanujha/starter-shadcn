import React from "react";
import NoDataUiHandler from "./no-data-ui-handler";
import { useNavigate } from "react-router-dom";

const NoTemplateUiHandler = () => {
  const navigate = useNavigate();
  return (
    <NoDataUiHandler
      title="You have no templates"
      hideButton={false}
      description="You should add a new template and then get going"
      buttonTitle="Add template"
      buttonHandler={() => navigate('/create-template')}
    />
  );
};

export default NoTemplateUiHandler;
