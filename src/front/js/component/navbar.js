import React from "react";
import { Link } from "react-router-dom";
import logoNav from "../../img/logo-nav.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light  mb-3">
      <Link to="/">
        <img
          className="navbar-brand px-2 mb-0 h1"
          src={logoNav}
          alt="Logo"
          style={{ width: "100px" }}
        />
      </Link>
      <div className="ml-auto">
        <Link to="/dashboard">
          <button className="btn btn-primary mx-2">Dash</button>
        </Link>
        <Link to="/app">
          <button className="btn btn-primary mx-2">App</button>
        </Link>
        <Link to="/">
          <button className="btn btn-secondary mx-2">Home</button>
        </Link>
      </div>
    </nav>
  );
};
