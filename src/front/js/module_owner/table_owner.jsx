import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.scss";
import { Col, Row, Form, Table, Modal, Button } from "react-bootstrap";
import { FormNewOwner } from "./form_new_owner";
import Arrow from "./../../img/arrow-up.svg";

export const Table_owner = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState("");

  // Modal here:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const allOwners = store.allOwners; /////////////////////////////Get all owners from store
  const allClients = store.allClients;
  const allFormats = store.allFormats;
  const allVallas = store.allVallas;
  const [sortedOwners, setSortedOwners] = useState(allOwners);
  const [sortDirection, setSortDirection] = useState("ascending");

  // Function to sort an array of objects by a specified property
  const sortByProperty = (property, direction) => {
    const sortedArray = [...filteredOwners];
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
    setSortedOwners(sortedArray);
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
  const filteredOwners = allOwners.filter((index) => {
    if (query === "") {
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
    actions.getOwners();
    actions.getOwners();
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
              placeholder="Buscar"
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
                <th className="col-1">Provincia</th>
                <th className="col-2">Sentido</th>
                <th className="col-2">Medidas</th>
                <th className="col-1">Tipo</th>
                <th className="col-1">
                  Status
                  <button className="btn tableButton" onClick={() => handleClick("status")}>
                    <img src={Arrow} alt="Sorting arrow" />
                  </button>
                </th>
                <th className="col-1">
                  Cliente
                  <button className="btn tableButton" onClick={() => handleClick("client_id")}>
                    <img src={Arrow} alt="Sorting arrow" />
                  </button>
                </th>
                <th className="col-1">Arrendador</th>
              </tr>
            </thead>
            <tbody>
              {sortedOwners.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="col-1">
                      <Link to={"/DetailOwner/" + item.id}>
                        <span>{item.code}</span>{" "}
                      </Link>
                    </td>
                    <td className="col-2">{item.name}</td>
                    <td className="col-1">{item.province}</td>
                    <td className="col-2">{item.way}</td>
                    <td className="col-2">{allFormats.map((element) => (element.id == item.format_id ? element.size : ""))}</td>
                    <td className="col-1">{item.shape}</td>
                    <td className="col-1">{item.status}</td>
                    <td className="col-1">{allClients.map((element) => (element.id == item.client_id ? element.name : ""))}</td>
                    <td className="col-1">{allOwners.map((element) => (element.id == item.owner_id ? element.name : ""))}</td>
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
          <Modal.Title>Crear Nueva Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormNewOwner />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <button className="btn btn-primary" onClick={handleShow}>
        {" "}
        + Nueva Owner{" "}
      </button>

      {/* <DataGridx /> */}
    </div>
  );
};
