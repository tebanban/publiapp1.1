import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Route exact path="/" component={Home} />;
  }
  return children;
};
