import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logoNav from "../../img/logo-nav.png";
import { Nav, Dropdown, Button } from "react-bootstrap/";
import { UserProfile } from "./user_profile";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { token } = store;
  const { user_name } = store;

  const logout = () => {
    actions.logout();
  };

  return (
    <Nav className="navbar navbar-light navbarTop d-flex align-items-center">
      <Link to="/">
        <img className="navbar-brand px-2 mb-0 h1" src={logoNav} alt="Logo" style={{ width: "100px" }} />
      </Link>
      <div className="ml-auto d-flex align-items-center">
        <Link to="/">
          <button className="btn btn-primary mx-2">Home</button>
        </Link>
        {token && token !== "" && token !== "undefined" ? (
          <div className="d-flex align-items-center mx-4">
            <Link to="/app">
              <button className="btn btn-primary mx-2">App</button>
            </Link>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <i className="fa fa-user mx-2" aria-hidden="true" />
                {user_name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/userProfile/:id">Perfil de Usuario</Dropdown.Item>

                <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <Link to="/register">
            <Button variant="disabled">
              <i className="fa fa-user mx-2" aria-hidden="true" />
            </Button>
          </Link>
        )}
      </div>
    </Nav>
  );
};
