import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Register } from "./component/register";
import { App } from "./pages/app";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Error404 from "./pages/Error404";
import { DetailValla } from "./module_valla/detail_valla";
import { DetailOwner } from "./module_owner/detail_owner";
import { DetailClient } from "./module_client/detail_client";
import { Context } from "./store/appContext";
import { ProtectedRoute } from "./component/protected_route";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = import.meta.env.BASENAME || "";
  const { store } = useContext(Context);
  const { token } = store;

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />

            {/* Use the ProtectedRoute component */}
            <ProtectedRoute exact path="/app" component={App} token={token} />
            <ProtectedRoute exact path="/detailValla/:id" component={DetailValla} token={token} />
            <ProtectedRoute exact path="/detailOwner/:id" component={DetailOwner} token={token} />
            <ProtectedRoute exact path="/detailClient/:id" component={DetailClient} token={token} />

            <Route path="*" component={Error404} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
