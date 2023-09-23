import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Button } from "react-bootstrap";


function LoginModal() {
  const { store, actions } = useContext(Context);
 

  return (
    <div className="d-inline-block mx-4">
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
  );
}

export default LoginModal;
