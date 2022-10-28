import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/app.scss";
import { Col, Row, Form, Table, Modal, Button } from "react-bootstrap";
import { FormNewValla } from "../component/form_new_valla";

export const Table_valla = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState("");

  // Modal here:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dataOwners = store.allOwners; /////////////////////////////Get all owners from store
  const dataClients = store.allClients;
  const dataUsers = store.allUsers;

  //Filter by status
  const allVallas = store.allVallas.filter((index) => {
    if (query === "") {
      return index;
    } else if (index.code.toLowerCase().includes(query.toLowerCase())) {
      return index;
    } else if (index.status.toLowerCase().includes(query.toLowerCase())) {
      return index;
    }
  });

  return (
    <div>
      <div className="mx-2">
        {/* ...............................................................Filters at the top.... */}

        <Row className="mb-1">
          <Col md={4}>
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="form-control"
              id="inputSearch"
              placeholder="Search"
            ></input>
          </Col>
          <Col md={4}>
            <Form.Group>
              <select
                onChange={(e) => setQuery(e.target.value)}
                id="inputState"
                className="form-control"
              >
                <option defaultValue>Filtrar por estado...</option>
                <option>Arrendada</option>
                <option>Disponible</option>
                <option>Reservada</option>
                <option>Deshabilitada</option>
              </select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <select id="inputState" className="form-control">
                <option defaultValue>Filtrar por provincia...</option>
                <option>San José</option>
                <option>Alajuela</option>
                <option>Heredia</option>
                <option>Cartago</option>
                <option>Puntarenas</option>
                <option>Guanacaste</option>
                <option>Limón</option>
              </select>
            </Form.Group>
          </Col>
        </Row>

        {/* Table content................................................................... */}

        <Table striped hover size="sm" className="table">
          <thead>
            <tr className="listheader  d-flex">
              <th className="col-1">Código</th>
              <th className="col-2">Nombre</th>
              <th className="col-2">Ruta</th>
              <th className="col-2">Sentido</th>
              <th className="col-1">Horiz/Vert</th>
              <th className="col-1">Tipo</th>
              <th className="col-1">Status</th>
              <th className="col-1">Cliente</th>
              <th className="col-1">Arrendador</th>
            </tr>
          </thead>
          <tbody>
            {allVallas.map((item, index) => {
              return (
                <tr
                  key={index}
                  // This dinamically changes the background color of the row
                  className={item.status === "Arrendada" ? "arrendada " : "disponible "}
                >
                  <td className="col-1 ">
                    <Link to={"/FormUpdateValla/" + item.id}>
                      <span>{item.code}</span>
                    </Link>
                  </td>
                  <td className="col-2">{item.name}</td>
                  <td className="col-2">{item.route}</td>
                  <td className="col-2">{item.view}</td>
                  <td className="col-1">{item.layout}</td>
                  <td className="col-1">{item.typology}</td>
                  <td className="col-1">{item.status}</td>
                  <td className="col-1">
                    {dataClients.map((element, index) =>
                      element.id == item.client_id ? element.name : ""
                    )}
                  </td>
                  <td className="col-1">
                    {dataOwners.map((element, index) =>
                      element.id == item.owner_id ? element.name : ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <br />
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nueva Valla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormNewValla />
        </Modal.Body>
      </Modal>

      <button className="btn btn-primary" onClick={handleShow}>
        {" "}
        + Nueva Valla{" "}
      </button>

      {/* <DataGridx /> */}
    </div>
  );
};
