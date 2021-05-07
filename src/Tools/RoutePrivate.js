import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getSavedToken } from "./common";

const RoutePrivate = ({ component: Component, ...restElement }) => {
  return (
    <Route
      {...restElement}
      render={props =>
        getSavedToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default RoutePrivate;
