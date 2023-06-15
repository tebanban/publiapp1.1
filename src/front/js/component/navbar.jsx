import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logoNav from "../../img/logo-nav.png";
import { Nav, Modal, Button } from "react-bootstrap/";
import { UserProfile } from "./user_profile";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("token");
  const user_name = store.user_name;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <div className="ml-auto d-inline-block">
        <Link to="/app">
          <button className="btn btn-primary mx-2">App</button>
        </Link>
        <Link to="/">
          <button className="btn btn-primary mx-2">Home</button>
        </Link>
        {token && token != "" && token != "undefined" ? (
          <div className="d-inline-block mx-4">
            <Button variant="primary" onClick={handleShow}>
              <i className="fa fa-user mx-2" aria-hidden="true" />
              {user_name}
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Perfil de Usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UserProfile />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={logout}>
                  Cerrar sesión
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : (
          <Link to="/register">
            <button className="btn btn-primary mx-2">Registrarse</button>
          </Link>
        )}
      </div>
    </Nav>
  );
};
