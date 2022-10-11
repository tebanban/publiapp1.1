import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logoNav from "../../img/logo-nav.png";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("token");
  const current_user = store.current_user;
  

  const logout = () => {
    actions.logout();
  };

  return (
    <Nav className="navbar navbar-light mb-3 ">
      <Link to="/">
        <img
          className="navbar-brand px-2 mb-0 h1"
          src={logoNav}
          alt="Logo"
          style={{ width: "100px" }}
        />
      </Link>
      <div className="ml-auto">
        <Link to="/app">
          <button className="btn btn-primary mx-2">App</button>
        </Link>
        <Link to="/">
          <button className="btn btn-primary mx-2">Home</button>
        </Link>
        {token && token != "" && token != "undefined" ? (
          <NavDropdown
            title= {current_user}
            id="basic-nav-dropdown"
            className="d-inline-block btn  "
          >
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary mx-2">Login</button>
          </Link>
        )}
      </div>
    </Nav>
  );
};
