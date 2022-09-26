import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { Form, Button, Stack } from "react-bootstrap";

export const FormValla = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [data, setData] = useState();

  const handleInputChange = (e) => {
    // console.log(e.target.name + ":" + e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitNewValla = (e) => {
    e.preventDefault();
    console.log(
      data.code,
      data.name,
      data.format,
      data.view,
      data.route,
      data.user
    );
    actions.postNewValla(
      data.code,
      data.name,
      data.format,
      data.view,
      data.route,
      data.user
    );
  };

  return (
    <Form className="form">
      <Form.Group className="form-group my-2">
        <label htmlFor="code" className="col-md-2 control-label">
          Código<span className="text-danger "> *</span>
        </label>
        <div className="col-md-10">
          <input
            className="form-control"
            id="code"
            maxLength="5"
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
            maxLength="10"
            name="name"
            required=""
            type="text"
            onChange={handleInputChange}
          />
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label htmlFor="format" className="col-md-2 control-label">
          Format<span className="text-danger "> *</span>
        </label>
        <div className="col-md-10">
          <select
            className="form-control"
            id="format"
            name="format"
            onChange={handleInputChange}
          >
            <option disable="true">Seleccionar...</option>
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
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
            maxLength="20"
            name="view"
            required=""
            type="text"
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
            maxLength="20"
            name="route"
            required=""
            type="text"
            onChange={handleInputChange}
          />
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label htmlFor="user" className="col-md-2 control-label">
          User<span className="text-danger "> *</span>
        </label>
        <div className="col-md-10">
          <select
            className="form-control"
            id="user"
            name="user"
            onChange={handleInputChange}
          >
            <option disable="true">Seleccionar...</option>
            <option value="user1">User1</option>
            <option value="user2">User2</option>
            <option value="user3">User3</option>
          </select>
        </div>
      </Form.Group>
      <Stack
        direction="horizontal"
        gap={2}
        className="mx-auto justify-content-center"
      >
        <Button variant="primary" onClick={submitNewValla}>
          Submit
        </Button>
        <Button variant="outline-secondary">Cancel</Button>
      </Stack>
    </Form>
  );
};
