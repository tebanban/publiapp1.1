import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { Form, Label } from "react-bootstrap";

export const FormValla = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <Form className="form">
      <Form.Group className="form-group my-2">
        <label for="code" className="col-md-2 control-label">
          Código<span className="text-danger "> *</span>
        </label>
        <div className="col-md-10">
          <input
            className="form-control"
            id="code"
            maxlength="10"
            name="code"
            required=""
            type="text"
          />
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label for="name" className="col-md-2 control-label">
          Nombre<span className="text-danger "> *</span>
        </label>
        <div className="col-md-10">
          <input
            className="form-control"
            id="code"
            maxlength="10"
            name="name"
            required=""
            type="text"
          />
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label for="format" className="col-md-2 control-label">
          Format<span className="text-danger "> *</span>
        </label>
        <div className="col-md-10">
          <select className="form-control" id="format" name="format">
            <option value="" selected disabled hidden>
              Seleccionar...
            </option>
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label for="view" className="col-md-2 control-label">
          Sentido<span className="text-danger "> *</span>
        </label>
        <div className="col-md-10">
          <input
            className="form-control"
            id="view"
            maxlength="20"
            name="view"
            required=""
            type="text"
          />
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label for="route" className="col-md-2 control-label">
          Ruta<span className="text-danger "> *</span>
        </label>
        <div className="col-md-10">
          <input
            className="form-control"
            id="route"
            maxlength="20"
            name="route"
            required=""
            type="text"
          />
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <label for="code" className="col-md-2 control-label">
          User<span className="text-danger "> *</span>
        </label>
        <div className="col-md-10">
          <select className="form-control" id="user" name="user">
            <option value="" selected disabled hidden>
              Seleccionar...
            </option>
            <option value="user1">User1</option>
            <option value="user2">User2</option>
            <option value="user3">User3</option>
          </select>
        </div>
      </Form.Group>
    </Form>
  );
};
