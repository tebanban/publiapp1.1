import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form } from "react-bootstrap";

export const UserProfile = () => {
  const { store, actions } = useContext(Context);

  const [editValla, setEditValla] = useState();
  const handleInputChange = (e) => {
    setEditValla({ ...editValla, [e.target.name]: e.target.value });
  };

  const submitSingleValla = (e) => {
    e.preventDefault();

    actions.updateValla(
      id,
      editValla.code,
      editValla.name,
      editValla.typology,
      editValla.layout,
      editValla.size,
      editValla.light,
      editValla.price_low,
      editValla.price_high,
      editValla.view,
      editValla.route,
      editValla.comment,
      editValla.user_id,
      editValla.client_id,
      editValla.owner_id
    );
  };

  return (
    <Form className="form">
      <Form.Group className="form-group my-2">
        <Form.Label htmlFor="name" className="col-md-2 control-label">
          Nombre<span className="text-danger "> *</span>
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
        <Form.Label htmlFor="typology" className="col-md-2 control-label">
          Tipo<span className="text-danger "> *</span>
        </Form.Label>
        <div className="col-md-10">
          <select
            className="form-control"
            id="typology"
            name="typology"
            onChange={handleInputChange}
          >
            <option value={singleValla.typology}>{singleValla.typology}</option>
            <option value="unipolar2">Unipolar 2 caras</option>
            <option value="unipolar1">Unipolar 1 cara</option>
          </select>
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <Form.Label htmlFor="layout" className="col-md-2 control-label">
          Horiz/Vert<span className="text-danger "> *</span>
        </Form.Label>
        <div className="col-md-10">
          <select
            className="form-control"
            id="layout"
            name="layout"
            onChange={handleInputChange}
          >
            <option value={singleValla.layout}>{singleValla.layout}</option>
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <Form.Label htmlFor="size" className="col-md-2 control-label">
          Dimensiones<span className="text-danger "> *</span>
        </Form.Label>
        <div className="col-md-10">
          <select
            className="form-control"
            id="size"
            name="size"
            onChange={handleInputChange}
          >
            <option value={singleValla.size}>{singleValla.size}</option>
            <option value="8.50 x 11.00 m">8.50 x 11.00 m</option>
            <option value="7.20 x 9.00 m">7.20 x 9.00 m</option>
          </select>
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <Form.Label htmlFor="light" className="col-md-2 control-label">
          Ilumninación<span className="text-danger "> *</span>
        </Form.Label>
        <div className="col-md-10">
          <select
            className="form-control"
            id="light"
            name="light"
            onChange={handleInputChange}
          >
            <option value={singleValla.light}>{singleValla.light}</option>
            <option value="Yes">Si</option>
            <option value="No">No</option>
          </select>
        </div>
      </Form.Group>

      <Form.Group className="form-group my-2">
        <Form.Label htmlFor="price_low" className="col-md-2 control-label">
          Precio menor <span className="text-danger "> *</span>
        </Form.Label>
        <div className="col-md-10">
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
        </div>
      </Form.Group>
      <Form.Group className="form-group my-2">
        <Form.Label htmlFor="price_high" className="col-md-2 control-label">
          Precio mayor <span className="text-danger "> *</span>
        </Form.Label>
        <div className="col-md-10">
          <input
            defaultValue={singleValla.price_high}
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
        <Form.Label htmlFor="route" className="col-md-2 control-label">
          Ruta<span className="text-danger "> *</span>
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
          Sentido<span className="text-danger "> *</span>
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
        <Form.Label htmlFor="user_id" className="col-md-2 control-label">
          Usuario<span className="text-danger "> *</span>
        </Form.Label>
        <div className="col-md-10">
          <select
            className="form-control"
            id="user_id"
            name="user_id"
            onChange={handleInputChange}
          >
            <option defaultValue={singleValla.user_id}>
              {singleValla.user_id}
            </option>
            <option></option>
          </select>
        </div>
      </Form.Group>
    </Form>
  );
};
