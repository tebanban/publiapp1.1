import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.scss";
import { Col, Row, Form, Table, Modal, Button } from "react-bootstrap";
import { FormNewValla } from "./form_new_valla";
import Arrow from "./../../img/arrow-up.svg";

export const Table_valla = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState("");

  // Modal here:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const allVallas = store.allVallas;
  const [sortedVallas, setSortedVallas] = useState(allVallas);
  const [sortDirection, setSortDirection] = useState("ascending");

  // Function to sort an array of objects by a specified property
  const sortByProperty = (property, direction) => {
    const sortedArray = [...filteredVallas];
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
    setSortedVallas(sortedArray);
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
  const filteredVallas = sortedVallas.filter((index) => {
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
                <th className="col-1">Propietario</th>
              </tr>
            </thead>
            <tbody>
              {filteredVallas.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="col-1">
                      <Link to={"/DetailValla/" + item.id}>
                        <span>{item.code}</span>{" "}
                      </Link>
                    </td>
                    <td className="col-2">{item.name}</td>
                    <td className="col-1">{item.province}</td>
                    <td className="col-2">{item.way}</td>
                    <td className="col-2">{item.format_size}</td>
                    <td className="col-1">{item.shape}</td>
                    <td className="col-1">{item.status}</td>
                    <td className="col-1">{item.client_name}</td>
                    <td className="col-1">{item.owner_name}</td>
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
