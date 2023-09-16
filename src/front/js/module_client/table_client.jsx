import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.scss";
import { Col, Row, Form, Table, Modal, Button } from "react-bootstrap";
import { FormNewClient } from "./form_new_client";
import Arrow from "./../../img/arrow-up.svg";

export const Table_client = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState("");

  // Modal here:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const allClients = store.allClients; /////////////////////////////Get all clients from store
  const { getClients } = actions;
  const [sortedClients, setSortedClients] = useState(allClients);
  const [sortDirection, setSortDirection] = useState("ascending");

  // Function to sort an array of objects by a specified property
  const sortByProperty = (property, direction) => {
    const sortedArray = [...filteredClients];
    sortedArray.sort((a, b) => {
      const valueA = a[property].toLowerCase();
      const valueB = b[property].toLowerCase();
      if (direction === "ascending") {
        return valueA.localeCompare(valueB);
      } else if (direction === "descending") {
        return valueB.localeCompare(valueA);
      }
      return 0;
    });
    setSortedClients(sortedArray);
  };

  // Function to handle the onClick event
  const handleClick = (property) => {
    let nextSortDirection = "ascending";
    if (sortDirection === "ascending") {
      nextSortDirection = "descending";
    }
    setSortDirection(nextSortDirection);
    sortByProperty(property, nextSortDirection);
  };

  //Filter by status
  const filteredClients = sortedClients.filter((index) => {
    if (query === "") {
      return index;
    } else if (index.code.toLowerCase().includes(query.toLowerCase())) {
      return index;
    } else if (index.name.toLowerCase().includes(query.toLowerCase())) {
      return index;
    } else if (index.email.toLowerCase().includes(query.toLowerCase())) {
      return index;
    }
  });

  useEffect(() => {
    getClients();
    console.log("Table_clients render");
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
              id="clientInputSearch"
              placeholder="Buscar"
            ></input>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Control as="select" name="name" defaultValue="" onChange={(e) => setQuery(e.target.value)}>
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
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Table content................................................................... */}
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="col-1 tableHeader">
                  Código
                  <button className="btn tableButton" onClick={() => handleClick("code")}>
                    <img src={Arrow} alt="Sorting arrow" />
                  </button>
                </th>
                <th className="col-2">
                  Nombre
                  <button className="btn tableButton" onClick={() => handleClick("name")}>
                    <img src={Arrow} alt="Sorting arrow" />
                  </button>
                </th>
                <th className="col-2">
                  Contacto
                  <button className="btn tableButton" onClick={() => handleClick("contact")}>
                    <img src={Arrow} alt="Sorting arrow" />
                  </button>
                </th>
                <th className="col-2">Email</th>
                <th className="col-1">Teléfono 1</th>
                <th className="col-1">Teléfono 2</th>
                <th className="col-2">Dirección</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="col-1">
                      <Link to={"/DetailClient/" + item.id}>
                        <span>{item.code}</span>{" "}
                      </Link>
                    </td>
                    <td className="col-2">{item.name}</td>
                    <td className="col-2">{item.contact}</td>
                    <td className="col-2">{item.email}</td>
                    <td className="col-1">{item.phone1}</td>
                    <td className="col-1">{item.phone2}</td>
                    <td className="col-2">{item.address}</td>
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
          <Modal.Title>Crear Nuevo Propietario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormNewClient />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <button className="btn btn-primary" onClick={handleShow}>
        {" "}
        + Nuevo Propietario{" "}
      </button>

      {/* <DataGridx /> */}
    </div>
  );
};
