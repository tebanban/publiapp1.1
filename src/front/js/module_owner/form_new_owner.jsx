import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Col, InputGroup, Row, Modal } from "react-bootstrap";

export const FormNewOwner = () => {
  const { store, actions } = useContext(Context);
  const dataOwners = store.allOwners; /////////////////////////////Get all owners from store
  const dataFormats = store.allFormats;
  const singleOwner = store.singleOwner;
  const [files, setFiles] = useState();
  const [formValues, setFormValues] = useState();
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const postOwnerMessage = store.updatedOwnerMessage;

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
      submitSingleOwner();

      // Resume default
      // form.submit();
    }

    setValidated(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const submitSingleOwner = () => {
    if (formValues) {
      actions.postNewOwner(formValues);
      console.log(formValues);
      // Show a success message using a modal dialog
      setModalTitle("Éxito!");
      setModalBody(postOwnerMessage || "test");
      setShowModal(true);
    }

    if (files) {
      actions.postOwnerFile(files);
      setModalTitle("Éxito!");
      setModalBody(postOwnerMessage || "Archivo test");
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
            <Form.Control required as="select" name="province" defaultValue="" onChange={handleChange}>
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
              placeholder="9.984"
              defaultValue=""
              onChange={handleChange}
              min="-90.0000"
              max="90.0000"
              step="0.001"
            />
            <Form.Control.Feedback type="invalid">{errors.lat}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Longitud</Form.Label>
            <Form.Control
              type="number"
              name="lng"
              defaultValue=""
              placeholder="-84.148"
              onChange={handleChange}
              min="-180.0000"
              max="180.0000"
              step="0.001"
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
            <Form.Control type="text" name="way" defaultValue="" onChange={handleChange} />
            <Form.Control.Feedback type="invalid">{errors.way}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Medidas</Form.Label>
            <Form.Control as="select" name="format_id" defaultValue="" onChange={handleChange} placeholder="Seleccionar...">
              <option value="">Seleccionar...</option>
              {dataFormats.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.size}
                </option>
              ))}
            </Form.Control>

            <Form.Control.Feedback type="invalid">{errors.format_id}</Form.Control.Feedback>
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
            <Form.Label>Precio S.C.</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control type="number" name="price_low" placeholder="1100" onChange={handleChange} max="20000.00" step="1" />
              <Form.Control.Feedback type="invalid">{errors.price_low}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Precio C.C.</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control type="number" name="price_high" placeholder="1300" onChange={handleChange} max="20000.00" step="1" />
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
                placeholder="950"
                onChange={handleChange}
                max="20000.00"
                step="1"
              />
              <Form.Control.Feedback type="invalid">{errors.price_canvas}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Tráfico (miles)</Form.Label>
            <Form.Control type="number" name="traffic" placeholder="75.000" onChange={handleChange} step="0.1" />
            <Form.Control.Feedback type="invalid">{errors.traffic}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Propietario</Form.Label>
            <Form.Control as="select" name="owner_id" defaultValue="" onChange={handleChange}>
              <option value="">Seleccionar...</option>
              {dataOwners.map((item) => (
                <option key={item.id} value={item.id}>
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
