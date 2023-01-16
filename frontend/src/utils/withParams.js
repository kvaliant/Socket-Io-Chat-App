import React from "react";
import { useParams } from "react-router-dom";

function WithParams(Component) {
  const params = useParams();
  return (props) => <Component {...props} params={params} searchParams={new URL(document.location).searchParams} />;
}

export default WithParams;
