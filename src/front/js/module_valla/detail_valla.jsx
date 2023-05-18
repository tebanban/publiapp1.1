import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal, Image } from "react-bootstrap";
import logo from "../../img/logo-publiex.png";
import { Form, Button, Stack, Container, Col, Row } from "react-bootstrap";
import { GoogleMapVallas } from "../module_valla/googlemap_vallas";
import { FormUpdateValla } from "../module_valla/form_udpate_valla";

console.log("pre-load");

export const DetailValla = () => {
  const { store, actions } = useContext(Context);
  const params = useParams(); //////////////////////////// get  valla id from the URL
  const id = params.id; ////////////////////////////////// store valla id as a variable

  const dataOwners = store.allOwners; /////////////////////////////Get all owners from store
  const dataClients = store.allClients;
  const dataUsers = store.allUsers;
  const dataFormats = store.allFormats;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    actions.resetDeleteVallaMessage();
  };
  // const [files, setFiles] = useState();

  useEffect(() => {
    /////////////////////////////////////// sends valla id as a parameter to the flux
    actions.getSingleValla(id);
  }, []);

  const singleValla = store.singleValla;
  const vallaPhoto = singleValla.picture_url;

  const deleteSingleValla = () => {
    actions.deleteSingleValla(id);
  };

  return (
    <Container className="detail-container py-4">
      <Row className="detail-title ">
        <Col className="detail-code p-3">
          <h1>{singleValla.code}</h1>
          <h5>{singleValla.route}</h5>
        </Col>
        <Col xs={8} className="detail-name p-3">
          <h1>{singleValla.name}</h1>
        </Col>
        <Col className="detail-status p-3">
          <h6>Estatus: {singleValla.status}</h6>
          <h5>{singleValla.order_id}</h5>
        </Col>
      </Row>
      <Row className="detail-middle-section pb-5">
        <Col lg={6} className="p-0">
          <div>
            <GoogleMapVallas lat={singleValla?.lat} lng={singleValla?.lng} />
          </div>
        </Col>
        <Col className="detail-img p-0">
          <div>
            <Image src={vallaPhoto} style={{ height: "50vh", width: "100%" }} />
          </div>
        </Col>
      </Row>
      <Row className="detail-blueline py-3">
        <Col>
          <h5>Precio mensual: ${singleValla.price_high}</h5>
        </Col>
        <Col>
          <h5>Impresión de lona: ${singleValla.price_canvas}</h5>
        </Col>
        <Col>
          <h5>Tráfico vehicular diario: {singleValla.traffic} mil* </h5>
        </Col>
      </Row>

      <Row className="detail-info py-3">
        <Col>
          <h5>Ubicación:</h5>
          <p>{singleValla.address}</p>
        </Col>
        <Col>
          <h5>Sentido:</h5>
          <p>{singleValla.way}</p>
        </Col>
        <Col>
          <h5>Medidas:</h5>
          <p>{dataFormats.map(item => item.id === singleValla.format_id ? item.size : null)}</p>
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
            <Modal.Title>Editar Valla</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormUpdateValla />
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
