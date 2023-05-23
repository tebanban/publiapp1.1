import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "react-bootstrap";
import logo from "../../img/logo-publiex.png";
import { Button, Stack, Container, Col, Row, Image } from "react-bootstrap";
import { FormUpdateOwner } from "../module_owner/form_udpate_owner";

export const DetailOwner = () => {
  const { store, actions } = useContext(Context);
  const params = useParams(); //////////////////////////// get  owner id from the URL
  const id = params.id; ////////////////////////////////// store owner id as a variable

  const dataOwners = store.allOwners; /////////////////////////////Get all owners from store
  const dataClients = store.allClients;
  const dataUsers = store.allUsers;
  const dataFormats = store.allFormats;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    actions.resetDeleteOwnerMessage();
  };

  useEffect(() => {
    /////////////////////////////////////// sends owner id as a parameter to the flux
    actions.getSingleOwner(id);
  }, []);

  const singleOwner = store.singleOwner;

  return (
    <Container className="detail-owner-box py-4">
      <Row>
        <Col className="detail-owner-img">
          <div>
            <Image src={logo} style={{ height: "15vh", width: "40%" }} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="detail-owner-name py-3 ">
          <h3>{singleOwner.name}</h3>
        </Col>
      </Row>
      <hr className="mt-0"></hr>

      <Row className="detail-info ">
        <Col >
          <Col className="py-2">
            <h5>Compañía: {singleOwner.company}</h5>
          </Col>
          <Col className="py-2">
            <h5>Email: {singleOwner.email}</h5>
          </Col>
          <Col className="py-2">
            <h5>Teléfono 1: {singleOwner.phone}</h5>
          </Col>
          <Col className="py-2">
            <h5>Teléfono 2: {singleOwner.phone}</h5>
          </Col >
          <Col className="py-2">
            <h5>Dirección:{singleOwner.address}</h5>
          </Col>

          
        </Col>
      </Row>
      <hr></hr>

      <Stack direction="horizontal" gap={2} className="mx-auto mt-3 justify-content-center">
        <Link to="/app">
          <button className="btn btn-primary  mx-2">Retornar</button>
        </Link>
        <Button variant="danger" onClick={handleShow}>
          Editar
        </Button>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Owner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormUpdateOwner />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </Stack>
    </Container>
  );
};
