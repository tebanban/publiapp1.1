import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Stack } from "react-bootstrap";

export const FormEditValla = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getSingleValla();
  }, []);

  const params = useParams();

  const [inputVallas, setInputVallas] = useState(); // Get all vallas from store

  const dataOwners = store.allOwners; //Get all owners from store
  const dataClients = store.allClients;
  const dataUsers = store.allUsers;
  const dataValla = store.singleValla;

  const handleInputChange = (e) => {
    // console.log(e.target.name + ":" + e.target.value);
    setInputVallas({ ...inputVallas, [e.target.name]: e.target.value });
  };

  const submitNewValla = (e) => {
    e.preventDefault();
    console.log(
      inputVallas.code,
      inputVallas.name,
      inputVallas.typology,
      inputVallas.layout,
      inputVallas.owner_id,
      inputVallas.user_id
    );
    actions.postNewValla(
      inputVallas.code,
      inputVallas.name,
      inputVallas.typology,
      inputVallas.layout,
      inputVallas.size,
      inputVallas.light,
      inputVallas.price_low,
      inputVallas.price_high,
      inputVallas.view,
      inputVallas.route,
      inputVallas.comment,
      inputVallas.user_id,
      inputVallas.client_id,
      inputVallas.owner_id
    );
  };

  return (
    <Form className="form" method="post">
      {dataVallas.map((item, index) => {
        return (
          <div key={index}>
            <Form.Group className="form-group my-2">
              <label htmlFor="code" className="col-md-2 control-label">
                Código<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <input
                  placeholder={item.code}
                  className="form-control"
                  id="code"
                  maxLength="6"
                  name="code"
                  required
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <label htmlFor="name" className="col-md-2 control-label">
                Nombre<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <input
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
              <label htmlFor="typology" className="col-md-2 control-label">
                Tipo<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  id="typology"
                  name="typology"
                  onChange={handleInputChange}
                >
                  <option disable="true">Seleccionar...</option>
                  <option value="unipolar2">Unipolar 2 caras</option>
                  <option value="unipolar1">Unipolar 1 cara</option>
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <label htmlFor="layout" className="col-md-2 control-label">
                Horiz/Vert<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  id="layout"
                  name="layout"
                  onChange={handleInputChange}
                >
                  <option disable="true">Seleccionar...</option>
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <label htmlFor="size" className="col-md-2 control-label">
                Dimensiones<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  id="size"
                  name="size"
                  onChange={handleInputChange}
                >
                  <option disable="true">Seleccionar...</option>
                  <option value="8.50 x 11.00 m">8.50 x 11.00 m</option>
                  <option value="7.20 x 9.00 m">7.20 x 9.00 m</option>
                </select>
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <label htmlFor="light" className="col-md-2 control-label">
                Ilumninación<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  id="light"
                  name="light"
                  onChange={handleInputChange}
                >
                  <option disable="true">Seleccionar...</option>
                  <option value="Yes">Si</option>
                  <option value="No">No</option>
                </select>
              </div>
            </Form.Group>

            <Form.Group className="form-group my-2">
              <label htmlFor="price_low" className="col-md-2 control-label">
                Precio menor <span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="price_low"
                  maxLength="20"
                  name="price_low"
                  required=""
                  type="float"
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <label htmlFor="price_high" className="col-md-2 control-label">
                Precio mayor <span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="price_high"
                  maxLength="20"
                  name="price_high"
                  required=""
                  type="float"
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="form-group my-2">
              <label htmlFor="route" className="col-md-2 control-label">
                Ruta<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
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
              <label htmlFor="view" className="col-md-2 control-label">
                Sentido<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
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
            <Form.Group className="form-group my-2">
              <label htmlFor="comment" className="col-md-2 control-label">
                Comentario
              </label>
              <div className="col-md-10">
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
              <label htmlFor="user_id" className="col-md-2 control-label">
                Usuario<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  id="user_id"
                  name="user_id"
                  onChange={handleInputChange}
                >
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
              <label htmlFor="client_id" className="col-md-2 control-label">
                Cliente<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  id="client_id"
                  name="client_id"
                  onChange={handleInputChange}
                >
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
              <label htmlFor="owner_id" className="col-md-2 control-label">
                Propietario<span className="text-danger "> *</span>
              </label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  id="owner_id"
                  name="owner_id"
                  onChange={handleInputChange}
                >
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
          </div>
        );
      })}

      <Stack
        direction="horizontal"
        gap={2}
        className="mx-auto justify-content-center"
      >
        <Button variant="primary" onClick={submitNewValla}>
          Submit
        </Button>
        <Link to="/app">
          <button className="btn btn-secondary  mx-2">Cancel</button>
        </Link>
      </Stack>
    </Form>
  );
};
