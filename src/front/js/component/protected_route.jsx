import React from "react";
import { Route, Redirect } from "react-router-dom";

// sessionStorage check is usefull when reloading the page-
export const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return <Route {...rest} render={(props) => (token || sessionStorage.token ? <Component {...props} /> : <Redirect to="/" />)} />;
};
