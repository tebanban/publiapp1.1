import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal, Image } from "react-bootstrap";
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
          <h5>Estatus: {singleValla.status}</h5>
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
          <h5>Pauta mensual e iluminación</h5>
        </Col>
        <Col>
          <h5>Impresión de lona</h5>
        </Col>
        <Col>
          <h5>Tráfico mensual</h5>
        </Col>
      </Row>

      <Row className="detail-info py-3">
        <Col>
          <h5>Ruta:</h5>
          <p>{singleValla.route}</p>
        </Col>
        <Col>
          <h5>Tamaño:</h5>
          <p>{singleValla.size}</p>
        </Col>
        <Col>
          <h5>Tipo:</h5>
          <p>{singleValla.typology}</p>
        </Col>
        <Col>
          <h5>Formato:</h5>
          <p>{singleValla.layout}</p>
        </Col>
      </Row>
      <Row>
        <Col md className="px-3">
          {/* 

            <Form.Group className="form-group my-2">
              <label htmlFor="user_id" className=" control-label">
                Usuario
              </label>
              <div className="">
                <select className="form-control" id="user_id" name="user_id" onChange={handleInputChange}>
                  <option defaultValue="">
                    {dataUsers.map((item, index) => (item.id == singleValla.client_id ? item.name : ""))}
                  </option>
                  {dataUsers.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <label htmlFor="client_id" className=" control-label">
                Cliente
              </label>
              <div className="">
                <select className="form-control" id="client_id" name="client_id" onChange={handleInputChange}>
                  <option defaultValue="">
                    {dataClients.map((item, index) => (item.id == singleValla.client_id ? item.name : ""))}
                  </option>
                  {dataClients.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <label htmlFor="owner_id" className=" control-label">
                Propietario
              </label>
              <div className="">
                <select className="form-control" id="owner_id" name="owner_id" onChange={handleInputChange}>
                  <option defaultValue="">
                    {dataOwners.map((item, index) => (item.id == singleValla.client_id ? item.name : ""))}
                  </option>
                  {dataOwners.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <label htmlFor="file" className=" control-label">
                Fotografía
              </label>
              <div className="">
                <input
                  className="form-control"
                  id="file"
                  name="file"
                  type="file"
                  onChange={(e) => {
                    setFiles(e.target.files);
                  }}
                />
              </div>
            </Form.Group>
          </Form> */}
        </Col>
        {/* Column at the right    */}
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

        {/* <Modal show={show} onHide={handleClose}>
          {store.deleteVallaMessage ? (
            <>
              <Modal.Header>
                <Modal.Title>
                  La valla {singleValla.code}
                  {store.deleteVallaMessage}{" "}
                </Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Link to="/app">
                  <button className="btn btn-primary  mx-2" onClick={handleClose}>
                    Regresar
                  </button>
                </Link>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Header closeButton>
                <Modal.Title>¿Desea eliminar esta valla? </Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Link to="/app">
                  <button className="btn btn-secondary  mx-2" onClick={handleClose}>
                    Cancelar
                  </button>
                </Link>

                <Button variant="danger" onClick={deleteSingleValla}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal> */}
      </Stack>
    </Container>
  );
};
