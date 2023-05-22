import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "react-bootstrap";
import logo from "../../img/logo-publiex.png";
import { Button, Stack, Container, Col, Row } from "react-bootstrap";
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
    <Container className="detail-container py-4">
      <Row className="detail-title ">
        <Col className="detail-code p-3">
          <h1>{singleOwner.code}</h1>
          <h5>{singleOwner.name}</h5>
        </Col>
        <Col md="7" className="detail-name p-3">
          <h1>{singleOwner.name}</h1>
        </Col>
        <Col className="detail-status p-3">
          <h5>Estatus: {singleOwner.status}</h5>
          <hr></hr>
          <p>Disponible a partir de:</p>
          <p>{""}</p>
        </Col>
      </Row>

      <Row className="detail-blueline py-3">
        <Col>
          <h5>Precio mensual: ${singleOwner.price_high}</h5>
        </Col>
        <Col>
          <h5>Impresión de lona: ${singleOwner.price_canvas}</h5>
        </Col>
        <Col>
          <h5>Tráfico vehicular diario: {singleOwner.traffic} mil* </h5>
        </Col>
      </Row>

      <Row className="detail-info py-3">
        <Col>
          <h5>Ubicación:</h5>
          <p>{singleOwner.address}</p>
        </Col>
        <Col>
          <h5>Sentido:</h5>
          <p>{singleOwner.way}</p>
        </Col>

        <Col>
          <img className="navbar-brand px-2 mb-0 h1" src={logo} alt="Logo" style={{ width: "270px" }} />
        </Col>
      </Row>

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
