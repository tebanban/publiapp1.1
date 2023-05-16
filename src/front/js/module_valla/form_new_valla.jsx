import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Col, InputGroup, Row, Modal } from "react-bootstrap";

export const FormNewValla = () => {
  const { store, actions } = useContext(Context);
  const dataOwners = store.allOwners; /////////////////////////////Get all owners from store
  const dataClients = store.allClients;
  const dataUsers = store.allUsers;
  const singleValla = store.singleValla;
  const [files, setFiles] = useState();
  const [formValues, setFormValues] = useState();
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const postVallaMessage = store.updatedVallaMessage;

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  const errors = {
    name: "Error en el nombre",
    address: "Error en dirección",
    terms: "Debe aceptar los términos",
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      // Call an API or perform some other action with the form data here
      event.preventDefault();
      submitSingleValla();

      // Resume default
      form.submit();
    }

    setValidated(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const submitSingleValla = () => {
    if (formValues) {
      actions.postNewValla(formValues);
      console.log(formValues);
      // Show a success message using a modal dialog
      setModalTitle("Éxito!");
      setModalBody(postVallaMessage || "test");
      setShowModal(true);
    }

    if (files) {
      actions.postVallaFile(files);
      setModalTitle("Éxito!");
      setModalBody(postVallaMessage || "Archivo test");
      setShowModal(true);
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="">
            <Form.Label>Código</Form.Label>
            <Form.Control required type="text" name="code" defaultValue="" onChange={handleChange} min="5" />
            <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="">
            <Form.Label>Nombre</Form.Label>
            <Form.Control required type="text" name="name" defaultValue="" onChange={handleChange} min="5" />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label>Estatus</Form.Label>
            <Form.Control required as="select" name="status" defaultValue="" onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Arrendada">Arrendada</option>
              <option value="Disponible">Disponible</option>
              <option value="Reservada">Reservada</option>
              <option value="Deshabilitada">Deshabilitada</option>
              <option value="Otro">Otro</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label>Provincia</Form.Label>
            <Form.Control required as="select" name="province" defaultValue="" onChange={handleChange} required>
              <option value="">Seleccionar...</option>
              <option value="Alajuela">Alajuela</option>
              <option value="Cartago">Cartago</option>
              <option value="Guanacaste">Guanacaste</option>
              <option value="Heredia">Heredia</option>
              <option value="Limón">Limón</option>
              <option value="Puntarenas">Puntarenas</option>
              <option value="San José">San José</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.province}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="2">
            <Form.Label>Latitud</Form.Label>
            <Form.Control
              type="number"
              name="lat"
              defaultValue="9.984"
              onChange={handleChange}
              min="-90.00000"
              max="90.00000"
              step="0.00001"
            />
            <Form.Control.Feedback type="invalid">{errors.lat}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Longitud</Form.Label>
            <Form.Control
              type="number"
              name="lng"
              defaultValue="-84.148"
              onChange={handleChange}
              min="-180.00000"
              max="180.00000"
              step="0.00001"
            />
            <Form.Control.Feedback type="invalid">{errors.lng}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" name="address" defaultValue="" onChange={handleChange} />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Sentido</Form.Label>
            <Form.Control type="text" name="way" defaultValue={singleValla.way} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">{errors.way}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Tamaño</Form.Label>
            <Form.Control as="select" name="size" defaultValue={singleValla.size} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Vertical 7.20 x 9.00 mts (65 mts2)">Vertical 7.20 x 9.00 mts</option>
              <option value="Vertical 8.50 x 11.00 mts (94 mts2)">Vertical 8.50 x 11.00 mts</option>
              <option value="Vertical 5.40 x 7.20 mts (39 mts2)">Vertical 5.40 x 7.20 mts</option>
              <option value="Horizontal 12.60 x 5.00 mts (63 mts2)">Horizontal 12.60 x 5.00 mts</option>
              <option value="Horizontal 14.40 x 5.00 mts (72 mts2)">Horizontal 14.40 x 5.00 mts</option>
              <option value="Horizontal 14.40 x 6.00 mts (87 mts2)">Horizontal 14.40 x 6.00 mts</option>
              <option value="Horizontal 7.20 x 5.40 mts (39 mts2)">Horizontal 7.20 x 5.40 mts</option>
              <option value="Landmark 33.30 x 8.50 mts (283 mts2)">Landmark 33.30 x 8.50 mts</option>
              <option value="Landmark 71.10 x 4.90 mts (349 mts2)">Landmark 71.10 x 4.90 mts</option>
              <option value="Landmark 34.80 x 8.90 mts (310 mts2)">Landmark 34.80 x 8.90 mts</option>
              <option value="Otro">Otro</option>
            </Form.Control>

            <Form.Control.Feedback type="invalid">{errors.size}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Tipo</Form.Label>
            <Form.Control as="select" name="typology" defaultValue="" onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Unipolar">Unipolar</option>
              <option value="Landmark">Landmark</option>
              <option value="3 Columnas">3 Columnas</option>
              <option value="Otro">Otro</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.typology}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Iluminación</Form.Label>
            <Form.Control as="select" name="light" defaultValue="" onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="yes">Sí</option>
              <option value="no">No</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="2">
            <Form.Label>Precio sin comisión</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control
                type="number"
                name="price_low"
                defaultValue="1100"
                onChange={handleChange}
                max="20000.00"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid">{errors.price_low}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Precio con comisión</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control
                type="number"
                name="price_high"
                defaultValue="1300"
                onChange={handleChange}
                max="20000.00"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid">{errors.price_high}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Lona</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control
                type="number"
                name="price_canvas"
                defaultValue="950"
                onChange={handleChange}
                max="20000.00"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid">{errors.price_canvas}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Tráfico</Form.Label>
            <Form.Control type="number" name="traffic" defaultValue="50" onChange={handleChange} step="1" />
            <Form.Control.Feedback type="invalid">{errors.traffic}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Propietario</Form.Label>
            <Form.Control as="select" name="user_id" defaultValue={singleValla.owner_id} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              {dataOwners.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Comentario</Form.Label>
            <Form.Control as="textarea" type="text" name="comment" defaultValue="" onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Fotografía</Form.Label>
            <Form.Control
              type="file"
              name="file"
              id="file"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
          </Form.Group>
        </Row>

        <Form.Group className="my-3">
          <Form.Check required name="terms" label="Acepto los cambios" feedback={errors.terms} feedbackType="invalid" />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
