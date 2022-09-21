import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { Form, Label } from "react-bootstrap";

export const FormValla = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="form">
      <h3>Registrar nueva valla</h3>
      <Form.Group>
        <Form.Label htmlFor="inputAddress">Código</Form.Label>
        <input type="text" className="form-control" placeholder="SJ65"></input>
      </Form.Group>
      <Form.Group>
        <label htmlFor="inputAddress">Nombre</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
        ></input>
      </Form.Group>
      <Form.Group>
        <label htmlFor="inputAddress">Sentido</label>
        <input
          type="text"
          className="form-control"
          placeholder="San José - Alajuela"
        ></input>
      </Form.Group>
      <Form.Group>
        <label htmlFor="inputAddress">Ruta</label>
        <input
          type="text"
          className="form-control"
          placeholder="General Cañas"
        ></input>
      </Form.Group>
      <Form.Group>
        <label htmlFor="inputAddress">Usuario</label>
        <input type="" className="form-control"></input>
      </Form.Group>
      <Form.Group>
        <label htmlFor="inputAddress">Tipo</label>
        <input
          type="text"
          className="form-control"
          placeholder="Unipolar"
        ></input>
      </Form.Group>
      <Form.Group>
        <label htmlFor="inputAddress">Propietario</label>
        <input
          type="text"
          className="form-control"
          placeholder="Propietario"
        ></input>
      </Form.Group>
    </div>
  );
};
