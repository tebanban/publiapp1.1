import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.scss";
import { Col, Row, Form, Table, Modal, Button} from "react-bootstrap";
import { FormNewValla } from "./form_new_valla";

export const Table_valla = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState("");

  // Modal here:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dataOwners = store.allOwners; /////////////////////////////Get all owners from store
  const dataClients = store.allClients;
  const dataFormats = store.allFormats;

  //Filter by status
  const allVallas = store.allVallas.filter((index) => {
    if (query === "" ) {
      return index;
    } else if (index.code.toLowerCase().includes(query.toLowerCase())) {
      return index;
    } else if (index.status.toLowerCase().includes(query.toLowerCase())) {
      return index;
    } else if (index.province.toLowerCase().includes(query.toLowerCase())) {
      return index;
    }
  });

  useEffect(() => {
    actions.getClients();
    actions.getUsers();
    actions.getOwners();
    actions.getVallas();
  }, []);

  return (
    <div>
      <div className="mx-2">
        {/* ...............................................................Filters top row... */}

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
              <Form.Control as="select" name="province" defaultValue="" onChange={(e) => setQuery(e.target.value)}>
                <option value="">Filtro por provincia...</option>
                <option value="Alajuela">Alajuela</option>
                <option value="Cartago">Cartago</option>
                <option value="Guanacaste">Guanacaste</option>
                <option value="Heredia">Heredia</option>
                <option value="Limón">Limón</option>
                <option value="Puntarenas">Puntarenas</option>
                <option value="San José">San José</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Control as="select" name="typology" defaultValue="" onChange={(e) => setQuery(e.target.value)}>
                <option value="">Filtrar por estatus...</option>
                <option value="Arrendada">Arrendada</option>
                <option value="Disponible">Disponible</option>
                <option value="Reservada">Reservada</option>
                <option value="Deshabilitada">Deshabilitada</option>
                <option value="Otro">Otro</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Table content................................................................... */}
        <div className="tableBox">
        <Table striped hover size="sm" >
          <thead>
            <tr className="d-flex tableHeader">
              <th className="col-1">Código</th>
              <th className="col-2">Nombre</th>
              <th className="col-1">Provincia</th>
              <th className="col-2">Sentido</th>
              <th className="col-2">Medidas</th>
              <th className="col-1">Tipo</th>
              <th className="col-1">Status</th>
              <th className="col-1">Cliente</th>
              <th className="col-1">Arrendador</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {allVallas.map((item) => {
              return (
                <tr
                  key={item.id}
                  // This dinamically changes the background color of the row
                  className={item.status === "Arrendada" ? "arrendada " : "disponible "}
                >
                  <td className="col-1">
                    <Link to={"/DetailValla/" + item.id}>
                      <span>{item.code}</span>
                    </Link>
                  </td>
                  <td className="col-2">{item.name}</td>
                  <td className="col-1">{item.province}</td>
                  <td className="col-2">{item.way}</td>
                  <td className="col-2">{dataFormats.map(element => element.id == item.format_id ? element.size : "")}</td>
                  <td className="col-1">{item.shape}</td>
                  <td className="col-1">{item.status}</td>
                  <td className="col-1">
                    {dataClients.map(element => element.id == item.client_id ? element.name : "")}
                  </td>
                  <td className="col-1">
                    {dataOwners.map(element => element.id == item.owner_id ? element.name : "")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>


        </div>
        
      </div>
      <br />
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nueva Valla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormNewValla />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <button className="btn btn-primary" onClick={handleShow}>
        {" "}
        + Nueva Valla{" "}
      </button>

      {/* <DataGridx /> */}
    </div>
  );
};
