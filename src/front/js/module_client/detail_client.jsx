import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "react-bootstrap";
import logo from "../../img/logo-publiex.png";
import { Button, Stack, Container, Col, Row, Image, Card } from "react-bootstrap";
import { FormUpdateClient } from "../module_client/form_udpate_client";

export const DetailClient = () => {
  const { store, actions } = useContext(Context);
  const params = useParams(); //////////////////////////// get  client id from the URL
  const id = params.id; ////////////////////////////////// store client id as a variable

  const dataClients = store.allClients; /////////////////////////////Get all clients from store
  const dataOrders = store.allOrders;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    actions.resetDeleteClientMessage();
  };

  useEffect(() => {
    /////////////////////////////////////// sends client id as a parameter to the flux
    actions.getSingleClient(id);
  }, []);

  const singleClient = store.singleClient;

  return (
    <Container className="detail-client-box py-4">
      <Row>
        <h4>Perfil de Propietario</h4>
        <hr className="mt-0"></hr>
      </Row>
      <Row>
        <Col className="detail-client-img" md="2">
          <div>
            <Image src={logo} style={{ height: "8rem", width: "8rem" }} />
          </div>
        </Col>
        <Col md="4">
          <h3 className="title-blue">{singleClient.name}</h3>
          
          <p className="pt-4">Código: {singleClient.code}</p>

          <p>Cédula: {singleClient.number_id}</p>

          <p>Contacto: {singleClient.contact}</p>

          <p>Email: {singleClient.email}</p>

          <p>Teléfono 1: {singleClient.phone1}</p>

          <p>Teléfono 2: {singleClient.phone2}</p>

          <p>Dirección:{singleClient.address}</p>

          <p>Nota:{singleClient.comment}</p>
        </Col>
      </Row>

      <Row>
        <Col className="detail-client-name py-3 "></Col>
      </Row>

      <Row className="detail-info ">
        <Col></Col>
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
            <Modal.Title>Editar Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormUpdateClient />
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
