import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { OverlayTrigger, Card } from "react-bootstrap";
import { Form, Button, Stack, Popover, Container, Col, Row } from "react-bootstrap";
import { MapVallas } from "../component/map_vallas";

export const DetailValla = () => {
  const { store, actions } = useContext(Context);
  const params = useParams(); //////////////////////////// get  valla id from the URL
  const id = params.id; ////////////////////////////////// store valla id as a variable
  // console.log("this is the id: " + id);
  const dataOwners = store.allOwners; /////////////////////////////Get all owners from store
  const dataClients = store.allClients;
  const dataUsers = store.allUsers;
  const [files, setFiles] = useState();

  useEffect(() => {
    /////////////////////////////////////// send valla id to the flux when loading
    actions.getSingleValla(id);
  }, []);

  const singleValla = store.singleValla;
  // console.log(singleValla);

  const deleteSingleValla = () => {
    actions.deleteSingleValla(id);
  };
  const [inputDataValla, setInputDataValla] = useState();
  const handleInputChange = (e) => {
    setInputDataValla({ ...inputDataValla, [e.target.name]: e.target.value });
  };
  const vallaPhoto = singleValla.picture_url;
  const submitSingleValla = (e) => {
    e.preventDefault();

    actions.updateValla(id, inputDataValla);

    if (files) {
      actions.updateVallaFile(id, files);
    }
  };
  const popover = (
    <Popover id="popover-basic">
      <Button className="btn btn-danger mx-2" onClick={deleteSingleValla}>
        Confirmar eliminación de Valla
      </Button>
    </Popover>
  );

  return (
    <Container className="py-4">
      <Row>
        <Col className="pictureBox">
          <h1>{singleValla.code}</h1>
          <div className="rounded my-3">
            <Card.Img src={singleValla.picture_url} style={{ width: "80%", height: "22rem" }} />
          </div>
          <div className="rounded mb-0">
            <MapVallas />
          </div>
        </Col>
        <Col>
          <Form className="form">
            <Form.Group className="form-group my-2">
              <Form.Label htmlFor="name" className="col-md-2 control-label">
                Nombre
              </Form.Label>
              <div className="col-md-10">
                <input
                  defaultValue={singleValla.name}
                  className="form-control"
                  id="name"
                  maxLength="150"
                  name="name"
                  required=""
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <Form.Label htmlFor="status" className="col-md-2 control-label">
                Estatus
              </Form.Label>
              <div className="col-md-10">
                <select className="form-control" id="status" name="status" onChange={handleInputChange}>
                  <option value={singleValla.status}>{singleValla.status}</option>
                  <option value="disponible">Disponible</option>
                  <option value="arrendada">Arrendada</option>
                  <option value="reservada">Reservada</option>
                  <option value="deshabilitada">Deshabilitada</option>
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <Form.Label htmlFor="typology" className="col-md-2 control-label">
                Tipo
              </Form.Label>
              <div className="col-md-10">
                <select className="form-control" id="typology" name="typology" onChange={handleInputChange}>
                  <option value={singleValla.typology}>{singleValla.typology}</option>
                  <option value="unipolar2">Unipolar 2 caras</option>
                  <option value="unipolar1">Unipolar 1 cara</option>
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <Form.Label htmlFor="layout" className="col-md-2 control-label">
                Horiz/Vert
              </Form.Label>
              <div className="col-md-10">
                <select className="form-control" id="layout" name="layout" onChange={handleInputChange}>
                  <option value={singleValla.layout}>{singleValla.layout}</option>
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <Form.Label htmlFor="size" className="col-md-2 control-label">
                Dimensiones
              </Form.Label>
              <div className="col-md-10">
                <select className="form-control" id="size" name="size" onChange={handleInputChange}>
                  <option value={singleValla.size}>{singleValla.size}</option>
                  <option value="8.50 x 11.00 m">8.50 x 11.00 m</option>
                  <option value="7.20 x 9.00 m">7.20 x 9.00 m</option>
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <Form.Label htmlFor="light" className="col-md-2 control-label">
                Ilumninación
              </Form.Label>
              <div className="col-md-10">
                <select className="form-control" id="light" name="light" onChange={handleInputChange}>
                  <option value={singleValla.light}>{singleValla.light}</option>
                  <option value="Yes">Si</option>
                  <option value="No">No</option>
                </select>
              </div>
            </Form.Group>

            <Form.Group className="form-group my-1 ">
              <Form.Label htmlFor="price_low" className=" control-label col-md-2">
                Precio
              </Form.Label>
              <Stack direction="horizontal" gap={2} className="col-md-10">
                <input
                  defaultValue={singleValla.price_low}
                  className="form-control"
                  id="price_low"
                  maxLength="20"
                  name="price_low"
                  required=""
                  type="float"
                  onChange={handleInputChange}
                />
                <div className="vr" />
                <input
                  defaultValue={singleValla.price_high}
                  className="form-control "
                  id="price_high"
                  maxLength="20"
                  name="price_high"
                  required=""
                  type="float"
                  onChange={handleInputChange}
                />
              </Stack>
            </Form.Group>

            <Form.Group className="form-group my-2">
              <Form.Label htmlFor="route" className="col-md-2 control-label">
                Ruta
              </Form.Label>
              <div className="col-md-10">
                <input
                  defaultValue={singleValla.route}
                  className="form-control"
                  id="route"
                  maxLength="150"
                  name="route"
                  required=""
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <Form.Label htmlFor="view" className="col-md-2 control-label">
                Sentido
              </Form.Label>
              <div className="col-md-10">
                <input
                  defaultValue={singleValla.view}
                  className="form-control"
                  id="view"
                  maxLength="100"
                  name="view"
                  required=""
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="form-group my-1 ">
              <Form.Label htmlFor="lat" className=" control-label col-md-2">
                Lat/Lng
              </Form.Label>
              <Stack direction="horizontal" gap={2} className="col-md-10">
                <input
                  defaultValue={singleValla.lat}
                  className="form-control"
                  id="lat"
                  maxLength="20"
                  name="lat"
                  required=""
                  type="float"
                  onChange={handleInputChange}
                />
                <div className="vr" />
                <input
                  defaultValue={singleValla.lng}
                  className="form-control "
                  id="lng"
                  maxLength="20"
                  name="lng"
                  required=""
                  type="float"
                  onChange={handleInputChange}
                />
              </Stack>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <Form.Label htmlFor="comment" className="col-md-2 control-label">
                Comentario
              </Form.Label>
              <div className="col-md-10">
                <input
                  defaultValue={singleValla.comment}
                  className="form-control"
                  id="comment"
                  maxLength="200"
                  name="comment"
                  required=""
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="form-group my-2">
              <label htmlFor="user_id" className="col-md-2 control-label">
                Usuario
              </label>
              <div className="col-md-10">
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
              <label htmlFor="client_id" className="col-md-2 control-label">
                Cliente
              </label>
              <div className="col-md-10">
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
              <label htmlFor="owner_id" className="col-md-2 control-label">
                Propietario
              </label>
              <div className="col-md-10">
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
              <label htmlFor="file" className="col-md-2 control-label">
                Fotografía
              </label>
              <div className="col-md-10">
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
          </Form>
        </Col>
      </Row>

      <Stack direction="horizontal" gap={2} className="mx-auto mt-3 justify-content-center">
        <Button variant="primary" onClick={submitSingleValla} type="submit">
          Actualizar
        </Button>
        <Link to="/app">
          <button className="btn btn-secondary  mx-2">Cancelar</button>
        </Link>
        <OverlayTrigger trigger="click" placement="top" overlay={popover} type="submit">
          <Button variant="danger">Eliminar Valla</Button>
        </OverlayTrigger>
      </Stack>
    </Container>
  );
};
