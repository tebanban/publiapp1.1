import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Stack, Col } from "react-bootstrap";

export const FormNewValla = () => {
  const { store, actions } = useContext(Context);

  const [validated, setValidated] = useState(false);

  const [inputDataValla, setInputDataValla] = useState();
  const [files, setFiles] = useState();
  const dataOwners = store.allOwners; /////////////////////////////Get all owners from store
  const dataClients = store.allClients;
  const dataUsers = store.allUsers;

  const handleInputChange = (e) => {
    setInputDataValla({ ...inputDataValla, [e.target.name]: e.target.value });
  };

  const submitNewValla = (e) => {
    e.preventDefault();
    actions.postNewValla(inputDataValla);
    if (files) {
      actions.postVallaFile(files);
    }
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form className="form" method="post" noValidate validated={validated} onSubmit={submitNewValla}>
      <Form.Group as={Col} md="9" className="form-group my-2" controlId="validationCode">
        <label htmlFor="code" className="col-md-3 control-label">
          Código<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <input className="form-control" id="code" maxLength="6" name="code" required type="text" onChange={handleInputChange} />
        </div>
      </Form.Group>
      <Form.Group as={Col} md="9" className="" controlId="validationName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          required
          id="name"
          type="text"
          placeholder="Nombre"
          defaultValue=""
          maxLength="150"
          onChange={handleInputChange}
        />
        <Form.Control.Feedback>ok!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label htmlFor="typology" className="col-md-3 control-label">
          Estatus<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <select className="form-control" id="status" name="status" onChange={handleInputChange}>
            <option value="disponible">Disponible</option>
            <option value="arrendada">Arrendada</option>
            <option value="reservada">Reservada</option>
            <option value="deshabilitada">Deshabilitada</option>
          </select>
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label htmlFor="typology" className="col-md-3 control-label">
          Tipo<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <select className="form-control" id="typology" name="typology" onChange={handleInputChange}>
            <option disable="true">Seleccionar...</option>
            <option value="unipolar2">Unipolar 2 caras</option>
            <option value="unipolar1">Unipolar 1 cara</option>
          </select>
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label htmlFor="layout" className="col-md-3 control-label">
          Horiz/Vert<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <select className="form-control" id="layout" name="layout" onChange={handleInputChange}>
            <option disable="true">Seleccionar...</option>
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label htmlFor="size" className="col-md-3 control-label">
          Dimensiones<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <select className="form-control" id="size" name="size" onChange={handleInputChange}>
            <option disable="true">Seleccionar...</option>
            <option value="8.50 x 11.00 m">8.50 x 11.00 m</option>
            <option value="7.20 x 9.00 m">7.20 x 9.00 m</option>
          </select>
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label htmlFor="light" className="col-md-3 control-label">
          Ilumninación<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <select className="form-control" id="light" name="light" onChange={handleInputChange}>
            <option disable="true">Seleccionar...</option>
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
            defaultValue=""
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
            defaultValue=""
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
        <label htmlFor="route" className="col-md-3 control-label">
          Ruta<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <input
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
        <label htmlFor="view" className="col-md-3 control-label">
          Sentido<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <input
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
            defaultValue=""
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
            defaultValue=""
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
        <label htmlFor="comment" className="col-md-3 control-label">
          Comentario
        </label>
        <div className="col-md-9">
          <input
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
        <label htmlFor="user_id" className="col-md-3 control-label">
          Usuario<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <select className="form-control" id="user_id" name="user_id" onChange={handleInputChange}>
            <option value="" disable="true">
              Seleccionar...
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
        <label htmlFor="client_id" className="col-md-3 control-label">
          Cliente<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <select className="form-control" id="client_id" name="client_id" onChange={handleInputChange}>
            <option value="" disable="true">
              Seleccionar...
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
        <label htmlFor="owner_id" className="col-md-3 control-label">
          Propietario<span className="text-danger "> *</span>
        </label>
        <div className="col-md-9">
          <select className="form-control" id="owner_id" name="owner_id" onChange={handleInputChange}>
            <option value="" disable="true">
              Seleccionar...
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
        <label htmlFor="file" className="col-md-3 control-label">
          Fotografía
        </label>
        <div className="col-md-9">
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

      <Stack direction="horizontal" gap={2} className="mx-auto justify-content-center">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/app">
          <button className="btn btn-secondary  mx-2">Cancel</button>
        </Link>
      </Stack>
    </Form>
  );
};
