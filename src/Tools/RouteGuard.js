import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getSavedToken } from "./common";

const RouteGuard = ({ component: Component, ...restElement }) => {
  return (
    <Route
      {...restElement}
      render={props =>
        !getSavedToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/dashboard" }} />
        )
      }
    />
  );
};

export default RouteGuard;
