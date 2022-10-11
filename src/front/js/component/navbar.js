import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logoNav from "../../img/logo-nav.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("token");
  const current_user = store.current_user

  const logout = ()=>{
    actions.logout();
  }

  return (
    <nav className="navbar navbar-light mb-3 ">
      <Link to="/">
        <img
          className="navbar-brand px-2 mb-0 h1"
          src={logoNav}
          alt="Logo"
          style={{ width: "100px" }}
        />
      </Link>
      <div className="ml-auto">
        {token && token != "" && token != "undefined" ? (
          <button className="btn btn-primary mx-2" onClick={logout}>
            <i className="fa fa-user" aria-hidden="true"></i>{" " + current_user}
          </button>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary mx-2">Login</button>
          </Link>
        )}

        <Link to="/app">
          <button className="btn btn-primary mx-2">App</button>
        </Link>
        <Link to="/">
          <button className="btn btn-primary mx-2">Home</button>
        </Link>
      </div>
    </nav>
  );
};
